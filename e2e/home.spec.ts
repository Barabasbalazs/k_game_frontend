import { test, expect } from '@playwright/test'

test.describe('Application Home Page', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/')
    
    // Check that the page title is correct
    await expect(page).toHaveTitle('k_game_frontend')
  })

  test('should display welcome message', async ({ page }) => {
    await page.goto('/')
    
    // Check for the "Hello from Bali" text
    const heading = page.locator('text=Hello from Bali')
    await expect(heading).toBeVisible()
  })

  test('should render Tmp component', async ({ page }) => {
    await page.goto('/')
    
    // Check for the Tmp component content
    const tmpComponent = page.locator('text=Hello from Tmp')
    await expect(tmpComponent).toBeVisible()
  })

  test('should be responsive', async ({ page }) => {
    await page.goto('/')
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('text=Hello from Bali')).toBeVisible()
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('text=Hello from Bali')).toBeVisible()
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('text=Hello from Bali')).toBeVisible()
  })
})
