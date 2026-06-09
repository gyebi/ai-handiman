# Customer Request Flow

Date: 2026-06-09

## Current State

The customer entry screen now starts a roadside assistance request draft. It collects:

- Service type.
- Basic vehicle details.
- Nearest area or landmark.
- Problem description.

Precise GPS is intentionally optional at draft time. The product policy remains: collect coarse area first and reveal precise customer location only to the accepted specialist.

## Domain Rules

Request drafts are validated in `src/domain/request-draft.ts`.

Current validation:

- Service type must be one of the supported roadside categories.
- Vehicle details are required so a specialist can prepare.
- Nearest area or landmark is required.
- Problem description must be at least 10 characters.
- Precise location must include both latitude and longitude if present.

## User-Friendly Error Guide

Error:

```text
Choose the type of roadside help needed.
```

Meaning: The user has not selected towing, jump start, flat tire help, lockout, fuel delivery, diagnostics, or minor roadside repair.

Error:

```text
Add basic vehicle details so the specialist can prepare.
```

Meaning: The form needs enough vehicle context for dispatch, such as make, model, color, or plate number.

Error:

```text
Add the nearest area or landmark.
```

Meaning: The app needs coarse location first, even before GPS is shared.

Error:

```text
Describe the problem in at least 10 characters.
```

Meaning: The problem description is too short to help classify or route the request.

Error:

```text
Precise location needs both latitude and longitude.
```

Meaning: GPS data is incomplete. Use no precise location, or include both coordinates.

## Not Implemented Yet

- Persisting the draft to a database.
- Customer authentication.
- GPS capture button.
- Media upload.
- Specialist matching.
- Notifications or chat.

These should be added after request draft persistence and authentication are designed.
