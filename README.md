# Playwright Automation Framework

A layered testing framework for a React full-stack app, focused on reliable UI validation, flow coverage, and browser-level regression checks.

## Preview

Live app used as a test demo (React + Vite, Material UI):
https://currency-exchange-nadiia.netlify.app

<img src="https://github.com/NadiiaSka/playwright-automation-fraimework/assets/82064570/1885a223-9726-406b-bbbc-2c7d8a25feaf" alt="Currency Converter App" width="400"/>

## Testing

The project uses a layered testing approach to keep the app reliable and easy to maintain:

- Component and unit tests validate rendering, user interactions, and form logic.
- Integration tests cover the main conversion flow and error handling.
- End-to-end tests verify the app in a real browser.
  Coverage focuses on currency selection, amount input, conversion behavior, switching currencies, and failure states.

Tools used:

- Vitest + Testing Library for fast UI and component tests
- Playwright for browser-level regression testing
- MSW for mocking API responses

The CI/CD pipeline is configured in GitHub Actions and runs automated checks on push and pull request events.

```mermaid
flowchart TD
	A[React App / Vite] --> B[Component tests]
	A --> C[Integration tests]
	A --> D[E2E browser tests]

	B --> E[Vitest + Testing Library]
	C --> E
	C --> F[MSW mock server]
	D --> G[Playwright]
	G --> H[real browser + local Vite server]
```

## Application Stack

- React + Vite
- Material UI

## Test Stack

- Vitest
- Testing Library
- Playwright
- MSW

## Quick start

[Repository](https://github.com/NadiiaSka/playwright-automation-fraimework)

### Prerequisites

```bash
node --version
npm --version
```

Required:

- Node.js 22 or higher
- npm 8 or higher

### Install

```bash
git clone https://github.com/NadiiaSka/playwright-automation-fraimework.git
cd playwright-automation-fraimework
npm install
npx playwright install
```

### Run the full test suite

```bash
npm run test:run
npm run test:end-end
```

### Run against a specific browser

```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
npm run test:cross-browser
```

`test:cross-browser` runs the suite against Chromium, Firefox, and WebKit.

### Run focused suites

```bash
npm run test:component
npm run test:integration
npm run test:end-end
```

## App overview

The app allows users to enter an amount, choose a source and target currency, switch the direction, and validate conversion results in a clean currency converter interface.
