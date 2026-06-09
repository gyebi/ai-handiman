import { serviceCategories, type ServiceCategory } from "./service-categories";

export type RequestDraftPreciseLocation = {
  latitude?: number;
  longitude?: number;
};

export type AssistanceRequestDraftInput = {
  serviceCategory: ServiceCategory | "";
  vehicleDescription: string;
  nearestArea: string;
  problemDescription: string;
  preciseLocation?: RequestDraftPreciseLocation;
};

export type AssistanceRequestDraft = {
  serviceCategory: ServiceCategory | "";
  vehicleDescription: string;
  nearestArea: string;
  problemDescription: string;
  preciseLocation?: RequestDraftPreciseLocation;
};

export type AssistanceRequestDraftValidation =
  | { valid: true; errors: [] }
  | { valid: false; errors: string[] };

export function createAssistanceRequestDraft(input: AssistanceRequestDraftInput): AssistanceRequestDraft {
  return {
    serviceCategory: input.serviceCategory,
    vehicleDescription: input.vehicleDescription.trim(),
    nearestArea: input.nearestArea.trim(),
    problemDescription: input.problemDescription.trim(),
    preciseLocation: input.preciseLocation,
  };
}

export function validateAssistanceRequestDraft(draft: AssistanceRequestDraft): AssistanceRequestDraftValidation {
  const errors: string[] = [];

  if (!serviceCategories.includes(draft.serviceCategory as ServiceCategory)) {
    errors.push("Choose the type of roadside help needed.");
  }

  if (draft.vehicleDescription.length === 0) {
    errors.push("Add basic vehicle details so the specialist can prepare.");
  }

  if (draft.nearestArea.length === 0) {
    errors.push("Add the nearest area or landmark.");
  }

  if (draft.problemDescription.length < 10) {
    errors.push("Describe the problem in at least 10 characters.");
  }

  if (draft.preciseLocation) {
    const hasLatitude = typeof draft.preciseLocation.latitude === "number";
    const hasLongitude = typeof draft.preciseLocation.longitude === "number";

    if (hasLatitude !== hasLongitude) {
      errors.push("Precise location needs both latitude and longitude.");
    }
  }

  return errors.length === 0 ? { valid: true, errors: [] } : { valid: false, errors };
}
