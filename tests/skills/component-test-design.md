# Component Test Design Standard

Use this standard whenever you are asked to design component-level test cases from a feature and its exploration notes.

## Objective

Produce a complete component test matrix for the UI element or component under review. Base the matrix on the real behavior of the component, the actual exploration notes, and the observable user interactions in the app.

## Required structure for every test case

Each test case must use this format:

- ID: a unique identifier such as `CT-01`
- Title: a short behavior-focused title, for example: `Amount input accepts valid numeric value`
- Preconditions: the setup needed before the interaction starts
- Steps: the exact user actions or render setup to perform
- Expected result: the observable UI or state outcome that proves the component behaves correctly

## Required categories

Every component must be covered in all three categories:

### Positive

Cover valid user input and the intended UI behavior. The component should work correctly when it receives expected values and user actions.

### Negative

Cover invalid input and rejected behavior. Include empty fields, incorrect values, malformed input, and unsupported states that should not be accepted.

### Edge

Cover boundary behavior. Include blank values, zero, minimum, maximum, just-below-minimum, just-above-maximum, max length, empty selections, and similar thresholds when relevant.

## Rules for the agent

1. Read the component and its exploration notes first.
2. Extract only behaviors that apply to the real component in this application.
3. Use the actual UI behavior, state flow, props, and known limitations documented in the notes.
4. Do not invent generic tests that are not relevant to the component.
5. Produce a complete matrix for the component, grouped by category.
6. Keep titles user-focused and behavior-focused.
7. Cover visible rendering, interaction, and state changes that matter to the user.
8. If the exploration notes identify a known issue or mismatch, add it as a planned regression case and label it clearly.
9. If the behavior is intentionally limited or currently faulty, note that explicitly in the expected result or preconditions.

## Coverage checklist

Before finishing, confirm the matrix includes:

- Positive interaction coverage
- Negative rejection coverage
- Edge boundary coverage
- Real component behavior from the exploration notes
- Known bug awareness and regression tracking

## Output style

Write the result in a concise, structured format. Keep it practical and readable for component-level design documentation.

## Reminder

A known bug is not a reason to skip coverage. It is a reason to add a regression case that documents the current limitation and the expected future behavior.
