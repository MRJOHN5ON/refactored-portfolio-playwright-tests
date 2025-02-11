import { test, expect } from '@playwright/test';
import { Global } from '../pages/global.js';




test('Each project box links to expected page', async ({ page }) => {
    const globalElements = new Global(page);
    await globalElements.goToBaseUrl();
    await expect(page).toHaveURL(globalElements.baseUrl)
  
    const expectedUrls = {
      0: 'https://testlio.com/job/freelance-uber-sf/',
      1: 'https://mrjohn5on.github.io/socialqa.html',
      2: 'https://mrjohn5on.github.io/project1.html',
      3: 'https://mrjohn5on.github.io/project2.html',
      4: 'https://mrjohn5on.github.io/project3.html',
      5: 'https://mrjohn5on.github.io/supernova.html',
      6: 'https://mrjohn5on.github.io/project4.html',
      7: 'https://github.com/MRJOHN5ON/learning_playwright',
      8: 'https://mrjohn5on.github.io/urbanscooters.html',
      9: 'https://github.com/MRJOHN5ON/E2E-webdriverIO-',
    };
  
    
    const projectBoxes = page.locator('.project-box');
  
    for (let key of Object.keys(expectedUrls)) {
      const i = Number(key);
      await projectBoxes.nth(i).click();
      await expect(page).toHaveURL(expectedUrls[i]);
  
      
      if (i < Object.keys(expectedUrls).length - 1) {
        await page.goBack();
      }
    }
     
  
  });


// --------------------------------------------------------------------
// --------------------------------------------------------------------

test.describe('project box links to expected page', () => {
  test.beforeEach(async ({ page }) => {
    const globalElements = new Global(page);
    await globalElements.goToBaseUrl();
    await expect(page).toHaveURL(globalElements.baseUrl);
  });

  const expectedUrls = new Map();
     expectedUrls.set (0, 'https://testlio.com/job/freelance-uber-sf/');
     expectedUrls.set (1, 'https://mrjohn5on.github.io/socialqa.html');
     expectedUrls.set (2, 'https://mrjohn5on.github.io/project1.html');
     expectedUrls.set (3,  'https://mrjohn5on.github.io/project2.html');
     expectedUrls.set (4, 'https://mrjohn5on.github.io/project3.html');
     expectedUrls.set (5, 'https://mrjohn5on.github.io/supernova.html');
     expectedUrls.set (6, 'https://mrjohn5on.github.io/project4.html');
     expectedUrls.set (7, 'https://github.com/MRJOHN5ON/learning_playwright');
     expectedUrls.set (8, 'https://mrjohn5on.github.io/urbanscooters.html');
     expectedUrls.set (9, 'https://github.com/MRJOHN5ON/E2E-webdriverIO-');

    for (const [index, expectedUrl] of expectedUrls) {
      test(`Project Box ${index} links to ${expectedUrl}`, async ({page}) => {
        const projectBoxes = await page.locator('.project-box');
        await projectBoxes.nth(index).click();
        await expect(page).toHaveURL(expectedUrl);
    });
}
});
// --------------------------------------------------------------------
// --------------------------------------------------------------------

 
test.describe('project box links go to expected page', () => {
    test.beforeEach(async ({ page }) => {
      const globalElements = new Global(page)
      await globalElements.goToBaseUrl();
      await expect(page).toHaveURL(globalElements.baseUrl)
    });
    const projectBoxes = [
      { index: 0, expectedUrl: 'https://testlio.com/job/freelance-uber-sf/' },
      { index: 1, expectedUrl: 'https://mrjohn5on.github.io/socialqa.html' },
      { index: 2, expectedUrl: 'https://mrjohn5on.github.io/project1.html' },
      { index: 3, expectedUrl: 'https://mrjohn5on.github.io/project2.html' },
      { index: 4, expectedUrl: 'https://mrjohn5on.github.io/project3.html' },
      { index: 5, expectedUrl: 'https://mrjohn5on.github.io/supernova.html' },
      { index: 6, expectedUrl: 'https://mrjohn5on.github.io/project4.html' },
      { index: 7, expectedUrl: 'https://github.com/MRJOHN5ON/learning_playwright' },
      { index: 8, expectedUrl: 'https://mrjohn5on.github.io/urbanscooters.html' },
      { index: 9, expectedUrl: 'https://github.com/MRJOHN5ON/E2E-webdriverIO-' },
    ];
  

    for (const { index, expectedUrl } of projectBoxes) {
      test(`Project Box ${index} links to ${expectedUrl}`, async ({ page }) => {
        const projectBoxesLocator = await page.locator('.project-box');
        await projectBoxesLocator.nth(index).click();
        await expect(page).toHaveURL(expectedUrl);
      });
    };


  });