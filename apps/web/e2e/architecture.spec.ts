import { test, expect } from '@playwright/test';

test('homepage & projects load and architecture viewer toggles', async ({ page }) => {
    const base = process.env.PREVIEW_URL ?? 'http://localhost:3000';
    await page.goto(base);
    await expect(page).toHaveTitle(/Jeeva|Portfolio/i);

    // project pages
    for (const slug of ['knitibot', 'inquiro', 'elysium-ai']) {
        await page.goto(`${base}/projects/${slug}`);
        // We need to ensure the component is actually rendered. 
        // The previous implementation of ArchitectureViewerClient didn't explicitly have a data-testid="architecture-viewer" on the container,
        // but it has text "System Layers". Let's check for that or add the testid.
        // For now, let's check for "System Layers" text which indicates the viewer loaded.
        await expect(page.getByText('System Layers')).toBeVisible();

        // Check for layer buttons
        const layerBtn = page.getByRole('button').first();
        await expect(layerBtn).toBeVisible();
        await layerBtn.click();

        // Check if snippet drawer or content updates. 
        // Clicking a layer should show the snippet filename in the code pane.
        await expect(page.getByText(/\.(py|tsx|sql|ts)$/)).toBeVisible();
    }
});
