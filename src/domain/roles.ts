export const userRoles = ["customer", "specialist", "admin"] as const;
export type UserRole = (typeof userRoles)[number];

export const adminRoles = ["support", "verification", "operations", "super_admin"] as const;
export type AdminRole = (typeof adminRoles)[number];

export function isAdminRole(role: UserRole): boolean {
  return role === "admin";
}
