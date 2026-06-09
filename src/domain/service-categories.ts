export const serviceCategories = [
  "towing",
  "jump_start",
  "flat_tire",
  "vehicle_lockout",
  "fuel_delivery",
  "mobile_mechanic_diagnostics",
  "minor_roadside_repair",
] as const;

export type ServiceCategory = (typeof serviceCategories)[number];
