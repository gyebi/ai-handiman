export const requestStatuses = [
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
] as const;

export type RequestStatus = (typeof requestStatuses)[number];

const allowedTransitions: Record<RequestStatus, RequestStatus[]> = {
  created: ["open", "cancelled"],
  open: ["accepted", "cancelled", "unmatched"],
  accepted: ["en_route", "cancelled", "unable_to_complete"],
  en_route: ["arrived", "cancelled", "unable_to_complete"],
  arrived: ["diagnosing", "completed", "unable_to_complete"],
  diagnosing: ["completed", "unable_to_complete"],
  completed: [],
  unable_to_complete: ["open"],
  cancelled: [],
  unmatched: ["open", "cancelled"],
};

export function canTransitionRequest(from: RequestStatus, to: RequestStatus): boolean {
  return allowedTransitions[from].includes(to);
}
