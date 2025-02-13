import { test, expect } from '@playwright/test';
import { Postman } from '../pages/postman.js';

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

});



