# Copilot Instructio### Root Files
```
.github/copilot-instructions.md    # This file
.gitignore                          # Git ignore patterns
eslint.config.js                    # ESLint configuration
index.html                          # Main HTML entry point
package.json                        # Dependencies and scripts
playwright.config.ts                # Playwright E2E test configuration
tsconfig.json                       # TypeScript root config
tsconfig.app.json                   # TypeScript app config (target: ES2022)
tsconfig.node.json                  # TypeScript node config (target: ES2023)
vite.config.ts                      # Vite build configuration
vitest.config.ts                    # Vitest unit test configuration
yarn.lock                           # Dependency lock file (use yarn)
```_frontend

## Repository Overview

**k_game_frontend** is a React-based web game frontend built with TypeScript and Vite. It serves as the client-side interface for a game application, featuring modern tooling for development, testing, linting, and production builds. The project uses Tailwind CSS for styling and Zustand for state management.

### Key Technologies
- **Runtime**: Node.js (v22.22.0)
- **Language**: TypeScript (v5.9.3)
- **Framework**: React (v19.2.0)
- **Build Tool**: Vite (v7.3.1)
- **Package Manager**: npm/yarn (yarn.lock present; use npm commands)
- **CSS Framework**: Tailwind CSS (v4.2.0)
- **State Management**: Zustand (v5.0.11)
- **Linting**: ESLint with TypeScript support
- **Testing**: Vitest (v4.0.18)
- **Package Management**: Yarn (v1.22.19)

## Project Structure

### Root Files
```
.github/copilot-instructions.md    # This file
.gitignore                          # Git ignore patterns
eslint.config.js                    # ESLint configuration
index.html                          # Main HTML entry point
package.json                        # Dependencies and scripts
tsconfig.json                       # TypeScript root config
tsconfig.app.json                   # TypeScript app config (target: ES2022)
tsconfig.node.json                  # TypeScript node config (target: ES2023)
vite.config.ts                      # Vite build configuration
yarn.lock                           # Dependency lock file (use yarn, not npm)
```

### Source Directory (`src/`)
```
src/
├── App.tsx                         # Root React component
├── tests/
│   └── App.test.tsx                # App component tests
├── App.test.tsx                    # App component tests
├── main.tsx                        # Application entry point
├── index.css                       # Global styles
├── assets/                         # Static assets (currently empty)
├── components/
│   ├── Tmp.tsx                     # Example temporary component
│   └── tests/
│       └── Tmp.test.tsx            # Tmp component tests
└── test-setup/
    ├── setup.ts                    # Global test setup and mocks
    └── test-utils.tsx              # Custom render function and exports
```

### E2E Tests Directory
```
e2e/
└── home.spec.ts                    # Homepage e2e tests
```

### Important Configuration Details
- **Path Alias**: `@/` resolves to `./src/` (configured in vite.config.ts and tsconfig.app.json)
- **HTML Root**: Entry point is `<div id="root"></div>` in index.html
- **CSS**: Global styles in `src/index.css` with Tailwind CSS support
- **Module System**: ES modules (type: "module" in package.json)

## Build and Development Commands

### Prerequisites
**Always run `yarn install` before any other command** to ensure dependencies are in sync with lockfile.

### Available yarn Scripts
All commands must be run from the workspace root directory.

| Command | Purpose | Notes |
|---------|---------|-------|
| `yarn install` | Install/sync dependencies | **Always run this first** after pulling changes |
| `yarn run dev` | Start development server | Runs on http://localhost:5173 (or next available port); Hot Module Replacement enabled |
| `yarn run build` | Production build | Executes TypeScript check (`tsc -b`) then Vite build; output in `dist/` directory |
| `yarn run lint` | Run ESLint | Checks all `.ts` and `.tsx` files; run before committing |
| `yarn run preview` | Preview production build locally | Requires `yarn run build` to have run first |
| `yarn run test` | Run component tests in watch mode | Uses Vitest; useful for development |
| `yarn run test:ui` | Run tests with interactive UI | Vitest UI dashboard; great for debugging |
| `yarn run test:run` | Run component tests once and exit | CI-friendly; no watch mode |
| `yarn run test:coverage` | Generate coverage report | Outputs to coverage/ directory |
| `yarn run e2e` | Run E2E tests with Playwright | Tests against running dev server |
| `yarn run e2e:ui` | Run E2E tests in interactive UI mode | Playwright Test UI; for debugging |
| `yarn run e2e:debug` | Run E2E tests in debug mode | Step through tests interactively |

### Build Process Details

#### Development (`yarn run dev`)
- **Command**: `vite`
- **Output**: None (serves from memory)
- **Port**: 5173 (or higher if port is in use)
- **Features**: Hot Module Replacement (HMR), fast refresh
- **Time**: ~300ms startup
- **Notes**: Watch mode is automatic; server restarts on config changes

#### Production Build (`yarn run build`)
- **Command**: `tsc -b && vite build`
- **Step 1**: TypeScript compilation check (`tsc -b`) - validates all `.ts` and `.tsx` files
- **Step 2**: Vite build - bundles and optimizes for production
- **Output Directory**: `dist/`
- **Build Time**: ~1000ms typical
- **Output Files**:
  - `dist/index.html` - HTML entry point
  - `dist/assets/index-[hash].css` - Compiled CSS (~1.36 kB gzipped)
  - `dist/assets/index-[hash].js` - Bundled JavaScript (~60.69 kB gzipped)

#### Linting (`yarn run lint`)
- **Command**: `eslint .`
- **Scope**: All `.ts` and `.tsx` files
- **Config**: Uses flat config format (eslint.config.js)
- **Rules Include**:
  - TypeScript recommended rules
  - React Hooks best practices
  - React Refresh compatibility checks
  - ESLint recommended rules
- **Note**: No type-aware linting enabled by default (see README.md for upgrade path)

### Type Checking
- **Command**: `tsc -b` (run as part of build)
- **Strictness**: All strict mode options enabled
  - Unused locals flagged (`noUnusedLocals: true`)
  - Unused parameters flagged (`noUnusedParameters: true`)
  - No side-effect imports allowed (`noUncheckedSideEffectImports: true`)
  - Case fallthrough prevented in switches
- **Incremental Build**: Uses tsbuildinfo files in `node_modules/.tmp/` for fast rebuilds

## Component and UI Testing

### Unit & Component Testing with Vitest

**Framework**: Vitest (v4.0.18) with React Testing Library (v16.3.2)

#### Test Files Location
- **Pattern**: `src/**/*.test.tsx` and `src/**/*.spec.tsx`
- **Current Tests**: 
  - `src/App.test.tsx` - App component tests
  - `src/components/Tmp.test.tsx` - Tmp component tests

#### Running Component Tests

```bash
yarn run test              # Watch mode (development)
yarn run test:run          # Single run (CI/validation)
yarn run test:ui           # Interactive UI dashboard
yarn run test:coverage     # Generate coverage report
```

#### Component Test Patterns

All component tests use the render function from `@testing-library/react`:

```typescript
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('should render', () => {
    const { getByText } = render(<MyComponent />)
    expect(getByText('Expected Text')).toBeInTheDocument()
  })
})
```

#### Test Utilities
- **Location**: `src/test-setup/test-utils.tsx` - Custom render wrapper for providers
- **Setup File**: `src/test-setup/setup.ts` - Global test configuration (mocks, cleanup)

#### Test Environment
- **Environment**: jsdom (DOM simulation)
- **Libraries**:
  - `@testing-library/react@16.3.2` - Component testing
  - `@testing-library/jest-dom@6.9.1` - DOM matchers (e.g., `toBeInTheDocument()`)
  - `vitest@4.0.18` - Test runner
  - `@vitest/ui@4.0.18` - Interactive test UI
  - `jsdom@28.1.0` - DOM implementation

#### Configuration
- **File**: `vitest.config.ts`
- **Key Settings**:
  - Global test APIs enabled (no imports needed for `describe`, `it`, `expect`)
  - jsdom environment for DOM testing
  - Path alias support (`@/` resolves to `src/`)
  - Setup runs before tests: `src/test/setup.ts`

### End-to-End Testing with Playwright

**Framework**: Playwright (v1.58.2)

#### E2E Test Files Location
- **Directory**: `e2e/`
- **Pattern**: `e2e/**/*.spec.ts`
- **Current Tests**: `e2e/home.spec.ts` - Application homepage tests

#### Running E2E Tests

```bash
yarn run e2e              # Run all E2E tests
yarn run e2e:ui           # Interactive Playwright UI (best for debugging)
yarn run e2e:debug        # Debug mode with step-through
```

#### E2E Test Patterns

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test('should perform action', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Hello')).toBeVisible()
    
    // Interactions
    await page.locator('button').click()
    await expect(page.locator('[data-testid="result"]')).toContainText('Success')
  })
})
```

#### E2E Configuration
- **File**: `playwright.config.ts`
- **Key Settings**:
  - `baseURL`: http://localhost:5173 (dev server)
  - `webServer`: Auto-starts dev server during E2E tests
  - **Browsers**: Chromium, Firefox, WebKit (desktop)
  - **Screenshots**: Captured on failure only
  - **Traces**: Recorded on first retry
  - **Reporting**: HTML report, console output
  - **Port**: Tests run against dev server on port 5173

#### Important Notes
- E2E tests require a running dev server (auto-started)
- Tests run in parallel across browser engines
- Use `await page.goto('/')` for navigation
- Use data-testid attributes for stable element selection: `await page.locator('[data-testid="id"]')`
- Screenshots and traces stored in `playwright-report/` and `test-results/`

### Test Validation Checklist

Before committing code with tests:

1. **Component Tests Pass**: `yarn run test:run` succeeds
2. **No Console Errors**: Tests should not produce console warnings
3. **Coverage Acceptable**: Run `yarn run test:coverage` for metrics
4. **E2E Tests Pass** (optional for CI): `yarn run e2e` succeeds when dev server is running
5. **Type Safety**: All test files pass `tsc -b` check (included in build)

### Testing Best Practices for Copilot

When adding new components:

1. **Create test file**: `src/components/MyComponent.test.tsx`
2. **Test behavior, not implementation**: Use `getByRole`, `getByLabelText` instead of `getByTestId`
3. **Keep tests focused**: One describe block per component
4. **Mock external dependencies**: API calls, timers, etc.
5. **Use data-testid sparingly**: Only for elements hard to query otherwise
6. **E2E tests for user flows**: Create `e2e/feature.spec.ts` for complex interactions
7. **Keep test output clean**: Avoid console.logs in production code

### Troubleshooting Tests

**Issue**: Tests timeout
- **Solution**: Increase timeout in test: `it('test', { timeout: 10000 }, async () => {})`

**Issue**: Component not rendering
- **Solution**: Check imports, ensure component is exported, verify providers in setup

**Issue**: E2E tests fail with "port already in use"
- **Solution**: Kill process on 5173 or let Playwright auto-increment port

**Issue**: Playwright install fails (missing dependencies)
- **Solution**: Expected on CI; optional for local debugging. Use `yarn run e2e:ui` for local testing

## Validation and Quality Checks

### Pre-Commit Validation Steps
Before making changes, ensure the agent can:
1. Run `yarn install` successfully (validates lockfile integrity)
2. Run `yarn run lint` with no errors (validates code style)
3. Run `yarn run test:run` with all tests passing (validates component functionality)
4. Run `yarn run build` successfully (validates TypeScript and production bundle)
5. Verify the build output exists in `dist/` directory

### Pre-Push Validation Sequence
```bash
yarn install                # Sync dependencies
yarn run lint              # Check code style
yarn run test:run          # Run all component tests once
yarn run build             # Full TypeScript check + production build
```

### Optional Additional Validation
```bash
yarn run test:coverage     # Check test coverage metrics
yarn run e2e               # E2E tests (requires dev server to be available)
yarn run preview           # Verify production build locally
```

## Known Configuration and Dependencies

### Unused Dependencies Warning
The project has 10 high severity vulnerability warnings from npm audit (as of latest scan). These are informational and can be safely ignored for development purposes. The dependencies currently installed are stable and tested:
- React/ReactDOM v19.2.0: Latest stable versions
- Zustand v5.0.11: Used for state management
- Tailwind CSS v4.2.0: CSS framework with Vite plugin

### Port Binding
- Dev server default port: 5173
- If port 5173 is in use, Vite automatically tries the next available port
- Check the terminal output to see which port was selected

### Path Aliases
The `@/` prefix is configured to resolve to `src/`:
- `import Tmp from '@/components/Tmp'` resolves to `src/components/Tmp.tsx`
- This applies in TypeScript (`tsconfig.app.json`) and Vite (`vite.config.ts`)

## CI/CD and GitHub Workflows
**No GitHub Actions workflows are currently configured** in this repository. The agent should validate changes locally using the commands listed above.

## Troubleshooting Guide

### Issue: TypeScript compilation errors after changes
**Solution**: Ensure all types are properly imported/exported. Run `yarn run build` to get full error details.

### Issue: ESLint fails with unused variable warnings
**Solution**: Either use the variable or remove it. The project has strict mode enabled for code quality.

### Issue: Port 5173 already in use
**Solution**: This is normal and handled automatically by Vite. Check the terminal output for the actual port number. No manual intervention needed.

### Issue: Stale dependencies or broken builds
**Solution**: Always run `yarn install` first to sync with the lockfile. Delete `node_modules/` and `.next/.tmp/` if issues persist.

## Trust These Instructions

This document provides all necessary information for the agent to build, test, lint, and validate the project. **Trust these instructions and only perform exploratory searches if this information is found to be incomplete or in error.** The commands have been validated to work correctly in the current environment.

## Update Instructions
- If you make changes to the project structure, dependencies, or build process, update this document accordingly to reflect those changes.
- Ensure that all commands and configurations are tested and verified before updating this document.

## Dependency Management
- Always use `yarn` commands to manage dependencies, as the project uses a `yarn.lock` file. Avoid using `npm` commands to prevent lockfile conflicts.

## Testing
- The project uses Vitest for testing, but no test files are currently present. To add tests, create `.test.ts` or `.test.tsx` files in the `src/` directory and run `yarn run test` (not currently defined, would need to be added to package.json scripts).
