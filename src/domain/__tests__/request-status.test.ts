import { describe, expect, test } from "vitest";
import { canTransitionRequest, requestStatuses } from "../request-status";

describe("request lifecycle", () => {
  test("defines the MVP request statuses", () => {
    expect(requestStatuses).toEqual([
      "created",
      "open",
      "accepted",
      "en_route",
      "arrived",
      "diagnosing",
      "completed",
      "unable_to_complete",
      "cancelled",
      "unmatched",
    ]);
  });

  test("allows a normal completion path", () => {
    expect(canTransitionRequest("created", "open")).toBe(true);
    expect(canTransitionRequest("open", "accepted")).toBe(true);
    expect(canTransitionRequest("accepted", "en_route")).toBe(true);
    expect(canTransitionRequest("en_route", "arrived")).toBe(true);
    expect(canTransitionRequest("arrived", "diagnosing")).toBe(true);
    expect(canTransitionRequest("diagnosing", "completed")).toBe(true);
  });

  test("blocks reopening completed or cancelled requests", () => {
    expect(canTransitionRequest("completed", "open")).toBe(false);
    expect(canTransitionRequest("cancelled", "open")).toBe(false);
  });

  test("allows open requests to become unmatched when no specialist accepts", () => {
    expect(canTransitionRequest("open", "unmatched")).toBe(true);
  });
});
