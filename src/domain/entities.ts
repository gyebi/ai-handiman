import type { AdminRole, UserRole } from "./roles";
import type { ServiceCategory } from "./service-categories";

export type SpecialistApprovalStatus = "draft" | "pending_review" | "approved" | "rejected" | "suspended";

export type City = {
  id: string;
  name: string;
  active: boolean;
};

export type ServiceArea = {
  id: string;
  cityId: string;
  name: string;
  active: boolean;
};

export type User = {
  id: string;
  phoneNumber: string;
  role: UserRole;
  adminRole?: AdminRole;
};

export type SpecialistProfile = {
  id: string;
  userId: string;
  approvalStatus: SpecialistApprovalStatus;
  approvedCategories: ServiceCategory[];
  approvedServiceAreaIds: string[];
  available: boolean;
};

export type RequestLocation = {
  coarseArea: string;
  latitude: number;
  longitude: number;
};
