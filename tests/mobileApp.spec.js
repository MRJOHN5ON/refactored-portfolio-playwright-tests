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
