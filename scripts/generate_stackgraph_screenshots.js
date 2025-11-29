const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function generateStackGraphScreenshots() {
    const outDir = path.join(process.cwd(), 'artifacts');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();

    const previewUrl = process.env.PREVIEW_URL || 'http://localhost:3000';

    try {
        await page.goto(previewUrl, { waitUntil: 'networkidle' });
        
        // Scroll to StackGraph section
        await page.evaluate(() => {
            const stackSection = Array.from(document.querySelectorAll('section')).find(s => 
                s.textContent?.includes('Tech Stack')
            );
            if (stackSection) {
                stackSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        await page.waitForTimeout(1000);
        
        // Wait for StackGraph to render (look for the SVG or the component)
        await page.waitForSelector('svg, [data-testid="stack-graph-client"]', { timeout: 10000 }).catch(() => {
            // If not found, try scrolling more
            return page.evaluate(() => {
                window.scrollTo(0, 600);
            });
        });
        
        await page.waitForTimeout(2000); // Wait for animation to settle

        // Dark mode screenshot
        await page.evaluate(() => {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
        });
        
        // Take screenshot of the StackGraph area
        const stackSection = await page.locator('section:has-text("Tech Stack")').first();
        if (await stackSection.count() > 0) {
            await stackSection.screenshot({ path: path.join(outDir, 'stackgraph-dark.png') });
        } else {
            await page.screenshot({ path: path.join(outDir, 'stackgraph-dark.png'), fullPage: false });
        }

        // Light mode screenshot
        await page.evaluate(() => {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
        });
        
        if (await stackSection.count() > 0) {
            await stackSection.screenshot({ path: path.join(outDir, 'stackgraph-light.png') });
        } else {
            await page.screenshot({ path: path.join(outDir, 'stackgraph-light.png'), fullPage: false });
        }

        console.log('StackGraph screenshots generated');
    } catch (e) {
        console.error('Error capturing StackGraph screenshots:', e);
    }

    await browser.close();
}

generateStackGraphScreenshots().catch(err => {
    console.error(err);
    process.exit(1);
});

