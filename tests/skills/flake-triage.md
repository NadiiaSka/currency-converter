# Flake Triage

## Purpose

Use this standard whenever a test fails. Decide whether the failure is a real product bug or a flaky test before drawing any conclusion.

## Required workflow

Follow this checklist in order before classifying the result:

1. Consistency
   - Re-run the same test a few times when the result is unclear.
   - If it fails every time, it leans toward a real bug.
   - If it fails only intermittently, it leans toward a flaky test.

2. Cause
   - Check whether the app is behaving incorrectly in the actual page state.
   - Or whether the test is timing out, racing, or using a fragile locator.
   - Real failures usually show the app in a bad state.
   - Flaky failures usually show test confusion, timing issues, or locator instability.

3. Evidence
   - Inspect the trace and the DOM state.
   - Confirm whether the app genuinely reached a broken state.
   - Or whether the test looked too early, missed the element, or relied on a brittle selector.

4. Classification
   - State clearly: "REAL BUG" or "FLAKY TEST".
   - Do not hedge or skip the classification.

5. Recommendation
   - If the result is a real bug, use the bug-reporting workflow and document the defect clearly.
   - If the result is flaky, name the fix specifically, for example: better locator, remove sleep, wait for the correct condition, improve isolation, or stabilize setup.
   - Do not file a bug for a flaky test.

## Short decision rules

- Consistent failure + broken app state = REAL BUG
- Intermittent failure + timing/locator issue = FLAKY TEST
- Unclear result = re-run the test a few times and re-check the trace before deciding

## Output format

Provide a short triage note with:

- Failure summary
- Consistency check result
- Cause analysis
- Evidence from the trace or page state
- Final classification: REAL BUG or FLAKY TEST
- Recommendation and next action

## Guardrails

- Do not conclude after one failed run when the pattern is unclear.
- Do not blame the app without checking the trace.
- Do not file a bug for a flaky test.
- Keep the triage concise and evidence-based.
