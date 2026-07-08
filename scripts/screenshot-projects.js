// Re-captures the project preview thumbnails used in src/projects/projects.jsx.
// Run manually whenever a project site changes: `npm run screenshot:projects`
// Keep this list in sync with the cards rendered in projects.jsx.
const path = require('path');
const { chromium } = require('playwright');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'projects');

// aspect-video (16:9) to match the <BrowserWindowCard> crop in projects.jsx
const VIEWPORT = { width: 1600, height: 900 };

const projects = [
    { url: 'https://websbybenny.de', file: 'websbybenny.jpg' },
    { url: 'https://portfolio.websbybenny.de/sportScorings', file: 'sportscorings.jpg' },
];

async function screenshotProject(browser, { url, file }) {
    const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 2 });
    try {
        console.log(`→ ${url}`);
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        // let entrance animations/fonts settle before capturing
        await page.waitForTimeout(800);
        const outPath = path.join(OUTPUT_DIR, file);
        await page.screenshot({ path: outPath, type: 'jpeg', quality: 85 });
        console.log(`  saved ${path.relative(process.cwd(), outPath)}`);
    } catch (err) {
        console.error(`  failed for ${url}: ${err.message}`);
    } finally {
        await page.close();
    }
}

async function main() {
    const fs = require('fs');
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const browser = await chromium.launch();
    try {
        for (const project of projects) {
            await screenshotProject(browser, project);
        }
    } finally {
        await browser.close();
    }
}

main();
