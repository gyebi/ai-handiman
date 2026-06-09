import { describe, expect, test } from "vitest";
import { createAssistanceRequestDraft, validateAssistanceRequestDraft } from "../request-draft";

describe("assistance request drafts", () => {
  test("accepts a complete roadside request draft without precise location", () => {
    const draft = createAssistanceRequestDraft({
      serviceCategory: "flat_tire",
      vehicleDescription: "Toyota Corolla, black",
      nearestArea: "East Legon near the tunnel",
      problemDescription: "Front passenger tire is flat and I do not have a spare.",
    });

    expect(validateAssistanceRequestDraft(draft)).toEqual({ valid: true, errors: [] });
  });

  test("requires service type, vehicle details, nearest area, and a useful problem description", () => {
    const draft = createAssistanceRequestDraft({
      serviceCategory: "",
      vehicleDescription: "  ",
      nearestArea: "",
      problemDescription: "flat",
    });

    expect(validateAssistanceRequestDraft(draft)).toEqual({
      valid: false,
      errors: [
        "Choose the type of roadside help needed.",
        "Add basic vehicle details so the specialist can prepare.",
        "Add the nearest area or landmark.",
        "Describe the problem in at least 10 characters.",
      ],
    });
  });

  test("rejects incomplete precise location coordinates", () => {
    const draft = createAssistanceRequestDraft({
      serviceCategory: "towing",
      vehicleDescription: "Nissan pickup",
      nearestArea: "Airport Residential",
      problemDescription: "The vehicle cannot start and needs towing.",
      preciseLocation: {
        latitude: 5.6037,
      },
    });

    expect(validateAssistanceRequestDraft(draft)).toEqual({
      valid: false,
      errors: ["Precise location needs both latitude and longitude."],
    });
  });
});
