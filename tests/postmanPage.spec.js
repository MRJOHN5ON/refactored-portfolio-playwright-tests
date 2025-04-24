import { test, expect } from '@playwright/test';
import PostmanPage from '../pages/postman.js';

test.describe('Page structure', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://mrjohn5on.github.io/project1.html');
    });

    test('should display the correct page title', async ({ page }) => {
        await expect(page).toHaveTitle('API Testing with Postman');
    });

    test('all h2 and h4 headers should be rgb(255, 64, 129) color', async ({ page }) => {
        // Check h2 headers
        const h2Headers = page.locator('h2');
        const countH2 = await h2Headers.count();
        for (let i = 0; i < countH2; i++) {
            await expect(h2Headers.nth(i)).toHaveCSS('color', 'rgb(255, 64, 129)');
        }
        
        // Check h4 headers
        const h4Headers = page.locator('h4');
        const countH4 = await h4Headers.count();
        for (let i = 0; i < countH4; i++) {
            await expect(h4Headers.nth(i)).toHaveCSS('color', 'rgb(255, 64, 129)');
        }
    });

    test('all h3 headers should be rgb(255, 64, 129) color', async ({ page }) => {
        const h3Headers = page.locator('h3');
        const count = await h3Headers.count();

        for (let i = 0; i < count; i++) {
            await expect(h3Headers.nth(i)).toHaveCSS('color', 'rgb(255, 64, 129)');
        }
    });

    test('all image caption paragraphs should be rgb(160, 160, 160) color', async ({ page }) => {
        const imageCaptions = page.locator('p.text-muted.mt-2');
        const count = await imageCaptions.count();

        for (let i = 0; i < count; i++) {
            await expect(imageCaptions.nth(i)).toHaveCSS('color', 'rgb(160, 160, 160)');
        }
    });
});

test.describe('Link Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://mrjohn5on.github.io/project1.html');
    });

    test('gitHub links open in new tab', async ({ page, context }) => {
        const topGithubPage = context.waitForEvent('page');
        await page.locator(PostmanPage.githubBt).first().click();
        const topGithubBt = await topGithubPage;

        const bottomGithubPage = context.waitForEvent('page');
        await page.locator(PostmanPage.githubBt).last().click();
        const bottomGithubBt = await bottomGithubPage;

        await topGithubBt.waitForLoadState();
        await bottomGithubBt.waitForLoadState();

        await expect(topGithubBt).toHaveURL('https://github.com/MRJOHN5ON/postmanAPI_testing');
        await expect(bottomGithubBt).toHaveURL('https://github.com/MRJOHN5ON/postmanAPI_testing');
    });

    test('Google Sheets link opens in new tab', async ({ page, context }) => {
        const googleSheetsPage = context.waitForEvent('page');
        await page.getByRole('link', { name: PostmanPage.googleSheetsRoleName }).click();
        const googleSheets = await googleSheetsPage;

        await googleSheets.waitForLoadState();
        await expect(googleSheets).toHaveURL('https://docs.google.com/spreadsheets/d/1u7IGVb-FNyHqHK7GsBrwKLk84MCGCfISmwzFId9o3K0/edit?gid=0#gid=0');
    });

    test('req1Img link opens in new tab with an enlarged image', async ({ page, context }) => {
        const req1Img = page.getByAltText(PostmanPage.req1ImgAltText);
        await expect(req1Img).toBeVisible();

        const imgSizeSmall = await req1Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();

        await req1Img.click();
        const newTab = await context.waitForEvent('page');

        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p1.png');

        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();

        expect(imgSizeLarge.width).toBeGreaterThanOrEqual(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThanOrEqual(imgSizeSmall.height);
    });

    test('node-tests link opens in new tab', async ({ page, context }) => {
        const nodeTestsPage = context.waitForEvent('page');
        await page.getByRole('link', { name: PostmanPage.nodeTestLinkRoleName }).click();
        const nodeTests = await nodeTestsPage;

        await nodeTests.waitForLoadState();
        await expect(nodeTests).toHaveURL('https://github.com/MRJOHN5ON/postmanAPI_testing/tree/main/node-tests');
    });

    test('postman1Img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const postman1Img = page.getByAltText(PostmanPage.postman1ImgAltText);
        await expect(postman1Img).toBeVisible();

        const imgSizeSmall = await postman1Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();

        await postman1Img.click();
        const newTab = await context.waitForEvent('page');

        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p2.png');

        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();

        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('jira1Img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const jira1Img = page.getByAltText(PostmanPage.jiraImgAltText).first();
        await expect(jira1Img).toBeVisible();

        const imgSizeSmall = await jira1Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();

        await jira1Img.click();
        const newTab = await context.waitForEvent('page');

        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p3.png');

        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();

        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('postman2Img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const postman2Img = page.getByAltText(PostmanPage.postman2ImgAltText);
        await expect(postman2Img).toBeVisible();

        const imgSizeSmall = await postman2Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();

        await postman2Img.click();
        const newTab = await context.waitForEvent('page');

        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p4.png');

        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();

        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('jira2Img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const jira2Img = page.getByAltText(PostmanPage.jiraImgAltText).last();
        await expect(jira2Img).toBeVisible();

        const imgSizeSmall = await jira2Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();

        await jira2Img.click();
        const newTab = await context.waitForEvent('page');

        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p5.png');

        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();

        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('req2pdf link triggers a PDF download', async ({ page }) => {
        const req2Pdf = page.getByRole('link', { name: PostmanPage.req2PdfRoleName });
        await expect(req2Pdf).toBeVisible();

        await req2Pdf.click();
        const download = await page.waitForEvent('download');

        expect(download.url()).toBe('https://practicum-content.s3.us-west-1.amazonaws.com/qa-us/pdf/Requirements_Shipping_Price_Calculations.pdf');
    });

    test('results img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const resultsTable = page.getByAltText(PostmanPage.resultsTableAltText);
        await expect(resultsTable).toBeVisible();

        const imgSizeSmall = await resultsTable.boundingBox();
        expect(imgSizeSmall).toBeTruthy();

        await resultsTable.click();
        const newTab = await context.waitForEvent('page');

        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p6.png');

        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();

        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('Footer home button navigates to the home page', async ({ page }) => {
        const footerHomeButton = page.getByRole('link', { name: PostmanPage.footerHomeButtonRoleName });
        await expect(footerHomeButton).toBeVisible();

        await footerHomeButton.click();
        await expect(page).toHaveURL('https://mrjohn5on.github.io/index.html');
    });

    test('Footer project bank button navigates to the project bank page', async ({ page }) => {
        const footerProjectBankButton = page.getByRole('link', { name: PostmanPage.footerProjectBankButtonRoleName });
        await expect(footerProjectBankButton).toBeVisible();

        await footerProjectBankButton.click();
        await expect(page).toHaveURL('https://mrjohn5on.github.io/#projects');
    });
});