const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

async function makePdfAndScreenshots() {
    const outDir = path.join(process.cwd(), 'artifacts');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

    const page = await context.newPage();

    // Adjust the preview URL to your local or preview URL.
    const previewUrl = process.env.PREVIEW_URL || 'http://localhost:3000';

    // Home page screenshots - dark and light
    try {
        await page.goto(previewUrl, { waitUntil: 'networkidle' });
        // set dark mode
        await page.evaluate(() => {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
        });
        await page.screenshot({ path: path.join(outDir, 'homepage_dark.png'), fullPage: true });

        // light
        await page.evaluate(() => {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
        });
        await page.screenshot({ path: path.join(outDir, 'homepage_light.png'), fullPage: true });

        // Project pages - using slugs from parsed resume if available
        const slugs = ['knitibot', 'inquiro', 'elysium-ai'];
        for (const slug of slugs) {
            const url = `${previewUrl}/projects/${slug}`;
            // We might not have these pages running yet, so catch errors
            try {
                await page.goto(url, { waitUntil: 'networkidle', timeout: 5000 });
                const screenshotPath = path.join(outDir, `project_${slug}.png`);
                await page.screenshot({ path: screenshotPath, fullPage: true });
            } catch (e) {
                console.warn(`Could not screenshot ${slug}: ${e.message}`);
            }
        }

        // Produce a simple PDF of home (example)
        const pdfPath = path.join(outDir, 'resume_designer.pdf');
        await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });
    } catch (e) {
        console.error('Error capturing screenshots/PDF:', e);
    }

    await browser.close();
    console.log('Artifacts written to', outDir);
}

makePdfAndScreenshots().catch(err => {
    console.error(err);
    process.exit(1);
});
