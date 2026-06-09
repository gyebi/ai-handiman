import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import AdminPage from "../admin/page";
import CustomerPage from "../page";
import SpecialistPage from "../specialist/page";

describe("entry pages", () => {
  test("renders the customer request entry screen", () => {
    render(<CustomerPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Roadside help, dispatched clearly" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Request assistance" })).toBeInTheDocument();
    expect(screen.getByText("Share the nearest area first. Precise location unlocks only for the accepted specialist.")).toBeInTheDocument();
  });

  test("renders the specialist queue placeholder", () => {
    render(<SpecialistPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Specialist queue" })).toBeInTheDocument();
    expect(screen.getByText("Approved specialists see open jobs that match their service area and categories.")).toBeInTheDocument();
  });

  test("renders the admin operations placeholder", () => {
    render(<AdminPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Operations console" })).toBeInTheDocument();
    expect(screen.getByText("Review approvals, request status changes, safety complaints, and sensitive access logs.")).toBeInTheDocument();
  });
});
