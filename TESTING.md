# Testing Guide

This document provides detailed guidance on testing practices in the k_game_frontend project.

## Quick Start

```bash
# Component tests (unit/integration)
yarn run test              # Watch mode
yarn run test:run          # Single run (CI)
yarn run test:ui           # Interactive dashboard

# E2E tests
yarn run e2e               # Run all tests
yarn run e2e:ui            # Interactive UI (best for debugging)
yarn run e2e:debug         # Debug step-through mode
```

## Component Testing (Vitest + React Testing Library)

### Writing Tests

Create test files alongside components in a folder called `tests` in the same path as the components with `.test.tsx` extension:

```typescript
// src/components/Button.tsx
export function Button({ onClick, children }: { onClick: () => void; children: string }) {
  return <button onClick={onClick}>{children}</button>
}
```

```typescript
// src/components/Button.test.tsx
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>)
    
    getByRole('button').click()
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Test Utilities

Use `@testing-library/react` utilities:

- `render()` - Mount component
- `getByRole()` - Find elements by ARIA role (preferred)
- `getByLabelText()` - Find labeled inputs
- `getByTestId()` - Find by data-testid (fallback)
- `getByText()` - Find by text content
- `queryBy*()` - Returns null if not found (for absence assertions)

### DOM Matchers

From `@testing-library/jest-dom`:

```typescript
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toHaveClass('active')
expect(element).toHaveAttribute('disabled')
expect(element).toContainHTML('<span>text</span>')
expect(element).toHaveTextContent('Hello')
```

### Async Testing

For async operations (state updates, API calls):

```typescript
import { render, waitFor } from '@testing-library/react'

it('loads data', async () => {
  const { getByText } = render(<DataLoader />)
  
  await waitFor(() => {
    expect(getByText('Loaded')).toBeInTheDocument()
  })
})
```

## E2E Testing (Playwright)

### Writing E2E Tests

Create test files in `e2e/` directory with `.spec.ts` extension:

```typescript
// e2e/button.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Button Interaction', () => {
  test('button click navigates to page', async ({ page }) => {
    await page.goto('/')
    
    // Find and click button
    await page.locator('button:has-text("Next")').click()
    
    // Verify navigation
    await expect(page).toHaveURL('/next-page')
  })
})
```

### Common Playwright Methods

```typescript
// Navigation
await page.goto('/path')
await expect(page).toHaveURL('/path')

// Finding elements
page.locator('button')
page.locator('[data-testid="submit"]')
page.locator('text=Click me')

// Interactions
await page.locator('input').fill('text')
await page.locator('button').click()
await page.locator('select').selectOption('Option 1')

// Assertions
await expect(page.locator('h1')).toContainText('Title')
await expect(page.locator('input')).toHaveValue('expected')
await expect(page.locator('button')).toBeEnabled()

// Wait for conditions
await page.waitForLoadState('networkidle')
await page.locator('button').waitFor()
```

### Debugging E2E Tests

```bash
# Interactive UI - best for debugging
yarn run e2e:ui

# Step through test
yarn run e2e:debug

# View HTML report after run
open playwright-report/index.html
```

## Best Practices

### For All Tests

✅ **Do:**
- Test user behavior, not implementation details
- Use semantic queries (role, label, text)
- Keep tests focused and independent
- Mock external dependencies
- Name tests descriptively
- Run tests frequently during development

❌ **Don't:**
- Test internal state directly
- Use implementation details (CSS classes, internal functions)
- Make tests dependent on each other
- Add unnecessary timeouts
- Leave tests as "skip" or "only"

### For Component Tests

✅ **Do:**
- Test a single component per describe block
- Test all props and state combinations
- Test error states
- Use `@testing-library/user-event` for interactions

### For E2E Tests

✅ **Do:**
- Test complete user workflows
- Use data-testid for reliable element selection only when needed
- Test across multiple browsers if relevant
- Use responsive viewport sizes for mobile testing

❌ **Don't:**
- Test implementation details (internal component state)
- Have order dependencies between tests
- Use hard-coded delays

## Test Coverage

Generate coverage report:

```bash
yarn run test:coverage
```

Coverage report outputs to `coverage/` directory.

## CI Integration

In GitHub Actions or other CI:

```bash
yarn install
yarn run lint
yarn run test:run        # Component tests
yarn run build           # TypeScript check
```

E2E tests can be optional or run on separate job with longer timeout.

## Troubleshooting

### Tests won't compile

Check that TypeScript types are correct:
```bash
yarn run build
```

### Component not rendering in test

- Verify component is exported correctly
- Check all required props are provided
- Ensure providers are in setup.ts if needed

### Test timeouts

Increase timeout for specific test:
```typescript
it('slow operation', { timeout: 10000 }, () => { ... })
```

### E2E tests fail locally but pass in CI

- Check that dev server is running: `yarn run dev`
- Clear browser cache: delete `playwright-report/`
- Use `yarn run e2e:debug` to inspect

### Can't connect to dev server

Ensure dev server is available on http://localhost:5173:
```bash
yarn run dev  # In another terminal
yarn run e2e  # In first terminal
```
