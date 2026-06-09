import type { AssistanceRequest, SpecialistProfile, User } from "./entities";
import type { RequestStatus } from "./request-status";

const activeAssignedStatuses = ["accepted", "en_route", "arrived", "diagnosing"] as const;
type ActiveAssignedStatus = (typeof activeAssignedStatuses)[number];

function isActiveAssignedStatus(status: RequestStatus): status is ActiveAssignedStatus {
  return activeAssignedStatuses.includes(status as ActiveAssignedStatus);
}

function isApprovedForRequest(
  user: User,
  profile: SpecialistProfile | undefined,
  request: AssistanceRequest,
): boolean {
  if (!profile || profile.approvalStatus !== "approved" || !profile.available) {
    return false;
  }

  return (
    profile.userId === user.id &&
    profile.approvedCategories.includes(request.serviceCategory) &&
    profile.approvedServiceAreaIds.includes(request.serviceAreaId)
  );
}

export function canViewRequestSummary(
  user: User,
  request: AssistanceRequest,
  specialistProfile?: SpecialistProfile,
): boolean {
  if (user.role === "customer") {
    return user.id === request.customerId;
  }

  if (user.role === "admin") {
    return user.adminRole === "support" || user.adminRole === "operations" || user.adminRole === "super_admin";
  }

  if (user.role === "specialist") {
    if (!isApprovedForRequest(user, specialistProfile, request)) {
      return false;
    }

    if (request.status === "open") {
      return true;
    }

    return request.specialistId === user.id && isActiveAssignedStatus(request.status);
  }

  return false;
}

export function canViewPreciseLocation(
  user: User,
  request: AssistanceRequest,
  specialistProfile?: SpecialistProfile,
): boolean {
  if (user.role === "customer") {
    return user.id === request.customerId;
  }

  if (user.role !== "specialist") {
    return false;
  }

  const isAssigned = request.specialistId === user.id;
  const isActive = isActiveAssignedStatus(request.status);

  return isAssigned && isActive && isApprovedForRequest(user, specialistProfile, request);
}
