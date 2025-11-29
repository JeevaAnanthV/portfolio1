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

        // Generate resume PDFs
        const resumeDesignerPath = path.join(outDir, 'resume_designer.pdf');
        await page.pdf({ path: resumeDesignerPath, format: 'A4', printBackground: true });
        
        // Generate ATS version (same content, different styling if needed)
        const resumeAtsPath = path.join(outDir, 'resume_ats.pdf');
        await page.pdf({ path: resumeAtsPath, format: 'A4', printBackground: true });

        // Generate project one-pagers
        for (const slug of slugs) {
            try {
                const projectUrl = `${previewUrl}/projects/${slug}`;
                await page.goto(projectUrl, { waitUntil: 'networkidle', timeout: 10000 });
                const onePagerPath = path.join(outDir, `${slug}-onepager.pdf`);
                await page.pdf({ path: onePagerPath, format: 'A4', printBackground: true });
                console.log(`Generated one-pager for ${slug}`);
            } catch (e) {
                console.warn(`Could not generate one-pager for ${slug}: ${e.message}`);
            }
        }

        // StackGraph screenshot
        try {
            await page.goto(`${previewUrl}/stack`, { waitUntil: 'networkidle', timeout: 10000 });
            await page.screenshot({ path: path.join(outDir, 'stackgraph.png'), fullPage: true });
        } catch (e) {
            console.warn(`Could not screenshot stack page: ${e.message}`);
        }
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
