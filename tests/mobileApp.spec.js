import { test, expect } from '@playwright/test';
import MobileAppPage from '../pages/mobileAppPage.js';




test.describe('Mobile App Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://mrjohn5on.github.io/project2.html');
    });

    test('should display the correct page header', async ({ page }) => {
        const pageHeader = page.locator('h1');
        await expect(pageHeader).toHaveText('ANDROID EMULATION TESTING REPORT FOR URBAN LUNCH APP');
    });


    /// youtube iframe tests go here
    test.describe('YouTube iframe tests (created with assistance from Claude)', () => {
        test('YouTube iframe should be visible', async ({ page }) => {
            const mobileAppPage = new MobileAppPage(page);
            await expect(mobileAppPage.youtubeIframeElement).toBeVisible();
        });

        test('YouTube iframe should have correct source URL', async ({ page }) => {
            const mobileAppPage = new MobileAppPage(page);
            await expect(mobileAppPage.youtubeIframeElement).toHaveAttribute('src', /youtube\.com\/embed\/0n95FT2YMgU/);
        });
        
        test('YouTube iframe should have correct title', async ({ page }) => {
            const mobileAppPage = new MobileAppPage(page);
            await expect(mobileAppPage.youtubeIframeElement).toHaveAttribute('title', 'YouTube video player');
        });

        test('YouTube iframe should have allowfullscreen attribute', async ({ page }) => {
            const iframe = page.locator('iframe').first();
            await expect(iframe).toHaveAttribute('allowfullscreen', '');
        });
        
        test('YouTube iframe should have proper accessibility attributes', async ({ page }) => {
            const mobileAppPage = new MobileAppPage(page);
            await mobileAppPage.checkYouTubeIframeAccessibility();
        });
        
        test('YouTube iframe should load properly', async ({ page }) => {
            const mobileAppPage = new MobileAppPage(page);
            await mobileAppPage.waitForYouTubeIframeToLoad();
            // Check that iframe is interactive after loading
            const iframe = page.locator('iframe').first();
            await expect(iframe).toBeVisible();
            await expect(iframe).toBeEnabled();
        });
        
        test('YouTube iframe should have proper dimensions', async ({ page }) => {
            const iframe = page.locator('iframe').first();
            
            // Get the parent container dimensions
            const container = page.locator('.video-wrapper');
            const containerBox = await container.boundingBox();
            
            // Verify iframe fills container with some tolerance
            const iframeBox = await iframe.boundingBox();
            expect(Math.abs(iframeBox.width - containerBox.width)).toBeLessThan(5);
            expect(Math.abs(iframeBox.height - containerBox.height)).toBeLessThan(5);
        });
    });


   
    test('should have an accordion header', async ({ page }) => {
        const mobileAppPage = new MobileAppPage(page);
        await expect(mobileAppPage.accordionHeader).toBeVisible();
    });

    test('accordion header should expand upon click', async ({ page }) => {
        const mobileAppPage = new MobileAppPage(page);
        await mobileAppPage.expandAccordion();
    });

    test('expanded accordion should display images', async ({page}) => {
        const mobileAppPage = new MobileAppPage(page);
        await mobileAppPage.expandAccordion();
        for (const image of mobileAppPage.expandedAccordionImages) {
            await expect(image).toBeVisible();
        }

    })


});
