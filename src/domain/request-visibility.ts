import type { AssistanceRequest, SpecialistProfile, User } from "./entities";

const activeAssignedStatuses = ["accepted", "en_route", "arrived", "diagnosing"] as const;

function isApprovedForRequest(profile: SpecialistProfile | undefined, request: AssistanceRequest): boolean {
  if (!profile || profile.approvalStatus !== "approved" || !profile.available) {
    return false;
  }

  return (
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
    return isApprovedForRequest(specialistProfile, request);
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
  const isActive = activeAssignedStatuses.includes(request.status as (typeof activeAssignedStatuses)[number]);

  return isAssigned && isActive && isApprovedForRequest(specialistProfile, request);
}
