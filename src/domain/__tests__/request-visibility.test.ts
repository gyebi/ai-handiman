import { describe, expect, test } from "vitest";
import type { AssistanceRequest, SpecialistProfile, User } from "../entities";
import { canViewPreciseLocation, canViewRequestSummary } from "../request-visibility";

const request: AssistanceRequest = {
  id: "request_1",
  customerId: "customer_1",
  specialistId: "specialist_user_1",
  serviceCategory: "towing",
  serviceAreaId: "area_accra_central",
  status: "accepted",
  location: {
    coarseArea: "Accra Central",
    latitude: 5.560014,
    longitude: -0.205744,
  },
};

const approvedSpecialist: SpecialistProfile = {
  id: "specialist_profile_1",
  userId: "specialist_user_1",
  approvalStatus: "approved",
  approvedCategories: ["towing"],
  approvedServiceAreaIds: ["area_accra_central"],
  available: true,
};

describe("request visibility", () => {
  test("customer can view their own request summary and precise location", () => {
    const user: User = { id: "customer_1", phoneNumber: "+233000000001", role: "customer" };

    expect(canViewRequestSummary(user, request)).toBe(true);
    expect(canViewPreciseLocation(user, request)).toBe(true);
  });

  test("approved matching specialist can view summary before accepting but not precise location", () => {
    const openRequest = { ...request, specialistId: undefined, status: "open" as const };
    const user: User = { id: "specialist_user_1", phoneNumber: "+233000000002", role: "specialist" };

    expect(canViewRequestSummary(user, openRequest, approvedSpecialist)).toBe(true);
    expect(canViewPreciseLocation(user, openRequest, approvedSpecialist)).toBe(false);
  });

  test("assigned specialist can view precise location while request is active", () => {
    const user: User = { id: "specialist_user_1", phoneNumber: "+233000000002", role: "specialist" };

    expect(canViewPreciseLocation(user, request, approvedSpecialist)).toBe(true);
  });

  test("unapproved specialist cannot view matching request summary", () => {
    const user: User = { id: "specialist_user_2", phoneNumber: "+233000000003", role: "specialist" };
    const unapproved = { ...approvedSpecialist, userId: "specialist_user_2", approvalStatus: "pending_review" as const };

    expect(canViewRequestSummary(user, request, unapproved)).toBe(false);
  });

  test("specialist cannot use another specialist profile to view request summary", () => {
    const user: User = { id: "specialist_user_2", phoneNumber: "+233000000003", role: "specialist" };

    expect(canViewRequestSummary(user, request, approvedSpecialist)).toBe(false);
  });

  test("assigned specialist cannot use another specialist profile to view precise location", () => {
    const user: User = { id: "specialist_user_1", phoneNumber: "+233000000002", role: "specialist" };
    const otherProfile = { ...approvedSpecialist, userId: "specialist_user_2" };

    expect(canViewPreciseLocation(user, request, otherProfile)).toBe(false);
  });

  test("suspended assigned specialist cannot view precise location", () => {
    const user: User = { id: "specialist_user_1", phoneNumber: "+233000000002", role: "specialist" };
    const suspended = { ...approvedSpecialist, approvalStatus: "suspended" as const };

    expect(canViewPreciseLocation(user, request, suspended)).toBe(false);
  });

  test("out-of-category assigned specialist cannot view precise location", () => {
    const user: User = { id: "specialist_user_1", phoneNumber: "+233000000002", role: "specialist" };
    const outOfCategory: SpecialistProfile = { ...approvedSpecialist, approvedCategories: ["jump_start"] };

    expect(canViewPreciseLocation(user, request, outOfCategory)).toBe(false);
  });

  test("specialist loses precise location access after cancellation", () => {
    const cancelled = { ...request, status: "cancelled" as const };
    const user: User = { id: "specialist_user_1", phoneNumber: "+233000000002", role: "specialist" };

    expect(canViewPreciseLocation(user, cancelled, approvedSpecialist)).toBe(false);
  });

  test("specialist loses precise location access after request becomes unmatched", () => {
    const unmatched = { ...request, status: "unmatched" as const };
    const user: User = { id: "specialist_user_1", phoneNumber: "+233000000002", role: "specialist" };

    expect(canViewPreciseLocation(user, unmatched, approvedSpecialist)).toBe(false);
  });

  test("support admin can view request summary but not precise location by default", () => {
    const user: User = {
      id: "admin_1",
      phoneNumber: "+233000000004",
      role: "admin",
      adminRole: "support",
    };

    expect(canViewRequestSummary(user, request)).toBe(true);
    expect(canViewPreciseLocation(user, request)).toBe(false);
  });
});
