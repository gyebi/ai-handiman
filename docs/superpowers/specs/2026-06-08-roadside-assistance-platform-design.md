# Roadside Assistance Platform Design

Date: 2026-06-08

## Summary

Build a mobile-first roadside assistance marketplace for Ghana. The first operational market is Accra, with the platform structured for later rollout to major cities including Kumasi, Tema, Takoradi, Tamale, Cape Coast, and Koforidua.

The MVP focuses on vehicle breakdown situations, not general home services. Customers request help, verified specialists accept relevant nearby requests, and both parties coordinate through status updates, ETA, map location context, and in-app chat. Payments happen offline in the MVP.

AI is limited to assisted intake and triage. It may help classify issues from chat, photos, or videos, but it must not present a final mechanical diagnosis or replace specialist judgment.

Agentic coding applies only to the development process. It is not a user-facing product feature in the MVP.

## Goals

- Let stranded drivers request roadside help quickly from a mobile device.
- Let verified specialists accept requests based on expertise, city or area, and availability.
- Support towing, jump starts, flat tires, lockouts, fuel delivery, mobile mechanic diagnostics, and qualified minor roadside repairs.
- Provide admin oversight for specialist approval, service areas, active requests, safety issues, and support.
- Build with security, privacy, and software supply-chain risk controls from the start.
- Keep the MVP small enough to validate operations before adding native apps, in-platform payments, or full live GPS tracking.

## Non-Goals

- General handyman or home services marketplace.
- Native iOS or Android apps for the first release.
- In-platform payments, refunds, or disputes for the first release.
- Full live GPS tracking for both parties in the first release.
- AI-based final diagnosis or automated repair instructions.
- Emergency dispatch replacement for police, ambulance, fire, or official emergency services.

## Users And Roles

### Customer

A driver or vehicle owner who needs roadside assistance. Customers log in with phone OTP. Email is optional for future account recovery and receipts.

### Specialist

A vetted roadside professional, mobile mechanic, tow operator, locksmith, tire technician, or fuel delivery provider. Specialists log in with phone OTP but cannot accept jobs until approved by an admin.

### Admin

An operations user who reviews specialist applications, manages service areas and categories, monitors active requests, handles support notes, reviews incidents, and suspends risky accounts.

## MVP Service Categories

- Towing
- Jump start
- Flat tire help
- Vehicle lockout
- Fuel delivery
- Mobile mechanic diagnostics at the breakdown location
- Minor roadside repair when the specialist is qualified and the situation is safe

## Geography

Accra is the first operational market. The data model and admin tools must support activating additional Ghanaian cities and service areas later. Major expansion targets include Kumasi, Tema, Takoradi, Tamale, Cape Coast, and Koforidua.

## Product Architecture

The MVP should be a single full-stack web application with clear internal boundaries:

- Customer mobile-first PWA
- Specialist mobile-first PWA
- Admin dashboard
- Backend API
- Database
- Private object storage for uploaded photos, videos, and verification documents
- Chat and notification services

This keeps the first build manageable while leaving room for later native mobile apps and payment integrations.

## Core Domains

### Identity And Access

- Phone OTP login for customers and specialists.
- Optional customer email.
- Role-based access control for customer, specialist, and admin.
- Admin approval required before specialists can accept requests.
- Admin accounts require stronger authentication than customer and specialist accounts.

### Requests And Dispatch

- Customers create breakdown requests with service type, vehicle details, location pin, description, and optional media.
- Requests have a clear lifecycle: created, open, accepted, en route, arrived, diagnosing, completed, unable to complete, cancelled, unmatched.
- Verified specialists can see relevant open requests by service category, city or area, and availability.
- One specialist accepts a request at a time.
- The MVP uses location pin, ETA, and status updates instead of full continuous GPS tracking.
- If no specialist accepts a request, it becomes unmatched and admin can intervene.

### Specialist Verification

Specialists must submit:

- Ghana Card or approved identity document.
- Profile photo.
- Business name, if applicable.
- Operating city or area.
- Service categories.
- Equipment or vehicle details, especially for towing and roadside work.
- Experience, certification, or qualification details.

Admins can approve, reject, request more information, or suspend a specialist.

### Chat

- In-app chat starts after a specialist accepts a request.
- Phone numbers are not exposed by default.
- Chat messages are associated with a request.
- Users can report abuse or safety issues from the chat context.

### Admin Operations

Admins can:

- Review specialist applications.
- Approve, reject, request more information, or suspend specialists.
- Monitor active and stuck requests.
- Manage service categories.
- Activate or deactivate cities and service areas.
- Review complaints and safety incidents.
- Add internal support notes.
- Review audit logs for sensitive actions.

### Ratings And Reviews

- Customers can submit a 1-5 rating after a completed job.
- Customers can leave a short written review.
- Customers can flag complaints for admin review.

## AI-Assisted Triage

AI may help with request intake by:

- Classifying likely service category from customer answers.
- Asking follow-up questions.
- Summarizing symptoms for specialists.
- Reviewing uploaded photos or videos to suggest likely issue categories.

AI must:

- Be presented as assistance, not final diagnosis.
- Avoid definitive repair claims.
- Defer to qualified specialist judgment.
- Handle uncertainty explicitly.
- Avoid replacing safety guidance or emergency services.

## Safety And Emergency Handling

- The app includes safety guidance and an SOS-style flow.
- The app must clearly state that it does not replace official emergency services.
- If a customer reports an unsafe location or immediate danger, the app surfaces emergency guidance and support escalation.
- Admins can review safety incidents and suspend accounts.
- Abuse reports from chat or request flows are admin-visible.

## Error And Edge Case Handling

- If no specialist accepts a request, the request moves to unmatched and admin can intervene.
- If a specialist accepts but cannot complete a job, the request can be closed or reopened for another specialist.
- If a customer cancels repeatedly, the account can be rate limited or reviewed.
- If a specialist repeatedly cancels or fails to arrive, admins can review and suspend the account.
- If AI triage is uncertain, it must say so and route the request to human specialist judgment.
- If uploads fail, the customer can submit the request without media.
- If location permission is denied, the customer can manually place or describe their location.

## Payments

Payments are offline in the MVP. The platform tracks request lifecycle and service completion, but customers pay specialists directly outside the app.

The architecture should leave room for future in-platform payments, including platform fees, receipts, disputes, refunds, and compliance checks.

## Security Requirements

- Enforce strong role separation between customer, specialist, and admin.
- Use least-privilege access to request, chat, document, media, and location data.
- Store uploaded documents, photos, and videos privately.
- Never expose verification documents publicly.
- Rate limit OTP, request creation, chat, uploads, and authentication-sensitive endpoints.
- Keep secrets out of source control.
- Restrict CI secrets to trusted branches and jobs.
- Audit admin actions, specialist approvals, request status changes, safety incidents, and account suspensions.
- Validate uploaded files by type, size, and storage policy.
- Protect against fake requests, spam, repeated cancellations, harassment, and account abuse.
- Avoid direct phone-number exposure by default.
- Make privacy implications of location sharing clear to users.

## Dependency Supply-Chain Security

Dependency security is a launch requirement.

- The seven-day waiting rule applies to all dependencies, including runtime, development, test, build, linting, formatting, and code generation packages.
- New dependencies and version upgrades must not be installed until at least seven days after release.
- Exceptions are allowed only for documented emergency security fixes after manual review.
- Lockfiles are required and committed.
- Runtime and package manager versions are pinned.
- Dependency additions require human review and a clear reason.
- AI coding agents must not add dependencies silently.
- Prefer mature, maintained packages with healthy project signals, clear licensing, and provenance where available.
- Keep dependency count low and prefer framework or platform built-ins when reasonable.
- Avoid package install scripts unless explicitly approved.
- CI must run tests, linting, build checks, dependency audit, secret scanning, and static analysis before merge.
- Generate an SBOM for releases.

## Development Process

Agentic coding is allowed only as part of the development workflow. Agents may help draft specs, create implementation plans, write code, run tests, review changes, and perform security checks.

Agentic development must follow these controls:

- Specs before implementation.
- Implementation plans before code changes.
- Tests appropriate to risk and behavior.
- Human review for dependency additions and security-sensitive changes.
- Security review before release.
- Verification evidence before marking work complete.

## Testing And Verification

The MVP should include focused tests for the highest-risk flows:

- Authentication and role-based access control.
- Specialist approval and suspension.
- Request lifecycle and one-specialist acceptance.
- Customer and specialist authorization for request and chat data.
- Admin-only actions.
- Upload validation.
- Rate limit behavior for OTP, request creation, chat, and uploads.
- AI triage uncertainty and human-handoff behavior.
- Dependency policy checks for lockfiles, audits, and seven-day dependency age review.

Release verification must include linting, tests, build checks, dependency audit, secret scanning, static analysis, and SBOM generation.

## Open Future Enhancements

- Native iOS and Android apps.
- Full live GPS tracking for customer and specialist.
- In-platform payments and platform fees.
- Masked calling.
- Trusted contact sharing.
- Specialist subscriptions or premium placement.
- Fleet or roadside company dashboards.
- Insurance or warranty integrations.
- More advanced AI operations tooling after the MVP is stable.
