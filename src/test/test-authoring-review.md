# Test Authoring Standard

Use this standard whenever you are asked to author or refine test cases for any testing layer, including component, integration, or end-to-end testing.

## Objective

Produce clear, reusable, behavior-based test cases that reflect the real application and the actual exploration notes. The goal is to create test cases that are accurate, maintainable, and useful in a portfolio or real team environment.

## Core rules

1. Base every case on the real feature, component, or user flow in the application.
2. Write test cases that describe user-visible behavior, not implementation details.
3. Keep the test names outcome-oriented and specific.
4. Cover all relevant happy paths, user errors, and boundary conditions.
5. Avoid generic or invented scenarios that do not match the app.

## Required case format

Each test case must follow this exact format:

- ID: unique identifier such as `TC-01`
- Title: behavior-based and specific, for example `Login rejects empty password`
- Preconditions: setup required before the action begins
- Steps: clear sequence of actions
- Expected result: observable outcome that proves the behavior works or fails correctly

## Required categories

Every feature or component must be covered in all three categories:

### Positive

Cover the intended behavior with valid input and correct user actions. This validates that the feature works as expected under normal conditions.

### Negative

Cover invalid or unsupported input. Include empty values, malformed data, wrong values, and states that should be rejected or ignored.

### Edge

Cover boundary conditions. Include zero, minimum, maximum, just below/above limit, empty states, maximum length, and similar threshold scenarios when relevant.

## Writing standards

- Use clear, concise titles that describe the behavior.
- Keep steps short and sequential.
- Make expected results observable and testable.
- Prefer user-facing language over internal implementation terms.
- Group cases by category for readability.
- Do not mix unrelated scenarios in a single case.

### FIXTURES

- Shared setup, such as login, goes into a fixture.
- Do not duplicate login setup across multiple tests.
- Keep the fixture responsible for setup and state preparation.

## Scope rules

- Component tests focus on isolated UI behavior, rendering, interaction, props, and local state.
- Integration tests focus on multi-step user flows, app state coordination, and interactions across components.
- E2E tests focus on high-value user journeys in the browser.

Use the same authoring structure across all three layers, but keep the scope aligned with the layer being tested.

## Final quality check

Before finalizing, confirm:

- The case is based on the real application and notes
- The title clearly describes the behavior
- The case belongs to the correct category
- The expected result is observable and testable

This is the reusable authoring standard for test writing across testing layers.
