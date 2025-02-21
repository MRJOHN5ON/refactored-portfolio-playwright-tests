import { test, expect } from '@playwright/test';
import { Postman } from '../pages/postman.js';

test.describe('Page structure', () => {
    test('should display the correct page title', async ({ page }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(page).toHaveTitle('API Testing with Postman');
    });

    test('all h2 should be #ff0404 color', async ({ page }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();

        const h2Headers = page.locator('h2');

        const countH2 = await h2Headers.count();

        for (let i = 0; i < countH2; i++) {
            await expect(h2Headers.nth(i)).toHaveCSS('color', 'rgb(255, 4, 4)');


        }

    });

    test('all h3 headers should be #a6ff00 color', async ({ page }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        const h3Headers = page.locator('h3');
        const count = await h3Headers.count();
        for (let i = 0; i < count; i++) {
            await expect(h3Headers.nth(i)).toHaveCSS('color', 'rgb(166, 255, 0)');
        }

    });

    test('all h4 headers should be #ff0404 color', async ({ page }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        const h4Headers = page.locator('h4');
        const count = await h4Headers.count();
        for (let i = 0; i < count; i++) {
            await expect(h4Headers.nth(i)).toHaveCSS('color', 'rgb(255, 4, 4)');
        }
    });

    test('all p class image captions should be #a6ff00 color', async ({ page }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        const pClassImageCaptions = page.locator('p.image-caption');
        const count = await pClassImageCaptions.count();
        for (let i = 0; i < count; i++) {
            await expect(pClassImageCaptions.nth(i)).toHaveCSS('color', 'rgb(166, 255, 0)');
        }
    });

});

test.describe('Link Tests', () => {


    test('gitHub links open in new tab', async ({ page, context }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        const [topGithubBt, bottomGithubBt] = await Promise.all([
            context.waitForEvent('page'),
            context.waitForEvent('page'),
            postmanPage.clickTopGithubBt(),
            postmanPage.clickBottomGithubBt()
        ]);
        await topGithubBt.waitForLoadState();
        await bottomGithubBt.waitForLoadState();
        await expect(topGithubBt).toHaveURL('https://github.com/MRJOHN5ON/postmanAPI_testing')
        await expect(bottomGithubBt).toHaveURL('https://github.com/MRJOHN5ON/postmanAPI_testing')
    });



    test('Google Sheets link opens in new tab', async ({ page, context }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        const [googleSheets] = await Promise.all([
            context.waitForEvent('page'),
            postmanPage.clickGoogleSheets()
        ])
        await googleSheets.waitForLoadState();
        await expect(googleSheets).toHaveURL('https://docs.google.com/spreadsheets/d/1u7IGVb-FNyHqHK7GsBrwKLk84MCGCfISmwzFId9o3K0/edit?gid=0#gid=0');
    });

    test('req1Img link opens in new tab with an enlarged image', async ({ page, context }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(postmanPage.req1Img).toBeVisible();


        const imgSizeSmall = await postmanPage.req1Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();


        postmanPage.clickReq1Img();
        const newTab = await context.waitForEvent('page');

        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p1.png');


        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();


        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('node-tests link opens in new tab', async ({ page, context }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        const [nodeTests] = await Promise.all([
            context.waitForEvent('page'),
            postmanPage.clickNodeTestsLink()
        ]);
        await nodeTests.waitForLoadState();
        await expect(nodeTests).toHaveURL('https://github.com/MRJOHN5ON/postmanAPI_testing/tree/main/node-tests');
    });

    test('postman1Img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(postmanPage.postman1Img).toBeVisible();
        const imgSizeSmall = await postmanPage.postman1Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();
        postmanPage.clickPostman1Img();
        const newTab = await context.waitForEvent('page');
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p2.png');
        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();
        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('jira1Img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(postmanPage.jira1Img).toBeVisible();
        const imgSizeSmall = await postmanPage.jira1Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();
        postmanPage.clickJira1Img();
        const newTab = await context.waitForEvent('page');
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p3.png');
        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();
        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('postman2Img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(postmanPage.postman2Img).toBeVisible();
        const imgSizeSmall = await postmanPage.postman2Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();
        postmanPage.clickPostman2Img();
        const newTab = await context.waitForEvent('page');
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p4.png');
        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();
        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('jira2Img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(postmanPage.jira2Img).toBeVisible();
        const imgSizeSmall = await postmanPage.jira2Img.boundingBox();
        expect(imgSizeSmall).toBeTruthy();
        postmanPage.clickJira2Img();
        const newTab = await context.waitForEvent('page');
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p5.png');
        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();
        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });
    test('req2pdf link triggers a PDF download', async ({ page }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(postmanPage.req2Pdf).toBeVisible();

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            postmanPage.clickReq2Pdf(),
        ]);


        expect(download.url()).toBe('https://practicum-content.s3.us-west-1.amazonaws.com/qa-us/pdf/Requirements_Shipping_Price_Calculations.pdf');
    });
    test('results img link opens in new tab as an enlarged image', async ({ page, context }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(postmanPage.resultsTable).toBeVisible();
        const imgSizeSmall = await postmanPage.resultsTable.boundingBox();
        expect(imgSizeSmall).toBeTruthy();
        postmanPage.clickResultsTable();
        const newTab = await context.waitForEvent('page');
        await newTab.waitForLoadState();
        await expect(newTab).toHaveURL('https://mrjohn5on.github.io/assets/images/p6.png');
        const imgSizeLarge = await newTab.locator('img').boundingBox();
        expect(imgSizeLarge).toBeTruthy();
        expect(imgSizeLarge.width).toBeGreaterThan(imgSizeSmall.width);
        expect(imgSizeLarge.height).toBeGreaterThan(imgSizeSmall.height);
    });

    test('Footer home button navigates to the home page', async ({ page }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(postmanPage.footerHomeButton).toBeVisible();
        await postmanPage.clickFooterHomeButton();
        await expect(page).toHaveURL('https://mrjohn5on.github.io/index.html');
    });

    test('Footer project bank button navigates to the project bank page', async ({ page }) => {
        const postmanPage = new Postman(page);
        await postmanPage.goToPostmanProject();
        await expect(postmanPage.footerProjectBankButton).toBeVisible();
        await postmanPage.clickFooterProjectBankButton();
        await expect(page).toHaveURL('https://mrjohn5on.github.io/#projects');
    });

});



