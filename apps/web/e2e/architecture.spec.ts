import { test, expect } from '@playwright/test';

test('homepage & projects load and architecture viewer toggles', async ({ page }) => {
  // Capture console errors
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  const base = process.env.PREVIEW_URL ?? 'http://localhost:3000';
  
  // Check homepage loads
  await page.goto(base, { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle(/Jeeva|Portfolio/i);

  // Check project pages and toggles
  for (const slug of ['knitibot','inquiro','elysium-ai']) {
    await page.goto(`${base}/projects/${slug}`, { waitUntil: 'networkidle' });
    
    // Wait a bit for JavaScript to load and check for errors
    await page.waitForTimeout(3000);
    
    if (errors.length > 0) {
      console.log('Console errors:', errors);
    }
    
    // Wait for the component to hydrate - check for "System Layers" text (more flexible)
    // If it doesn't appear, the component might not be loading
    const systemLayersVisible = await page.getByText('System Layers').isVisible({ timeout: 30000 }).catch(() => false);
    
    if (!systemLayersVisible) {
      // Take a screenshot for debugging
      await page.screenshot({ path: `test-results/debug-${slug}.png`, fullPage: true });
      const bodyText = await page.textContent('body');
      console.log('Page body text (first 500 chars):', bodyText?.substring(0, 500));
    }
    
    expect(systemLayersVisible).toBe(true);
    
    // Then wait for the test-id (client component should be hydrated by now)
    await page.waitForSelector('[data-testid="architecture-viewer"]', { timeout: 10000 });

    // click first layer (using data-testid on the buttons)
    await page.click('[data-testid="layer-button-0"]');
    // wait for snippet content
    await page.waitForSelector('[data-testid="snippet-content"]', { timeout: 10000 });
    // assert snippet is visible
    const content = await page.$('[data-testid="snippet-content"]');
    expect(content).not.toBeNull();
  }
});
