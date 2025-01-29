import { test, expect } from '@playwright/test';
import { Global } from '../pages/global.js';
import { HomePage } from '../pages/homepage.js';


test('should display the correct page title', async ({ page }) => {
  const globalElements = new Global(page);
  await globalElements.goToBaseUrl();
  await expect(page).toHaveURL(globalElements.baseUrl)
  await expect(page).toHaveTitle('Ryley Johnson');
});

test.describe('Navigation bar links', () => {
  test.beforeEach(async ({ page }) => {
    const globalElements = new Global(page);
    await globalElements.goToBaseUrl();
    await expect(page).toHaveURL(globalElements.baseUrl)
  });

  // Test case for navigating to the home section
  test('navigate to home', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navBar.clickTopHomeButton();
    await expect(page).toHaveURL('https://mrjohn5on.github.io/#home');
  });

  test('navigate to about', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navBar.clickTopAboutButton();
    await expect(page).toHaveURL('https://mrjohn5on.github.io/#about');
  });
  test('navigate to projects', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navBar.clickTopProjectsButton();
    await expect(page).toHaveURL('https://mrjohn5on.github.io/#projects');
  });

  test('navigate to contact', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navBar.clickTopContactButton();
    await expect(page).toHaveURL('https://mrjohn5on.github.io/#contact');
  });

});
// Tests For Resume and Cover Letter PDF Downloads
test.describe('Resume and Cover Letter Downloads', () => {
  test.beforeEach(async ({ page }) => {
    const globalElements = new Global(page);
    await globalElements.goToBaseUrl();
    await expect(page).toHaveURL(globalElements.baseUrl)
  });

  test('download resume', async ({ page }) => {
    const homePage = new HomePage(page);
    const [resumeDownload] = await Promise.all([
      page.waitForEvent('download'),
      homePage.downloadResume()
    ]);

    expect(resumeDownload.suggestedFilename().toLowerCase()).toContain('resume');
  });

  test('downloads cover letter', async ({ page }) => {
    const homePage = new HomePage(page);
    const [CVdownload] = await Promise.all([
      page.waitForEvent('download'),
      homePage.downloadCV()

    ]);
    expect(CVdownload.suggestedFilename().toLowerCase()).toContain('cover letter');
  });

});

// Tests for Social Media links 
test.describe('Social Media button functionality', async () => {
  test.beforeEach(async ({ page }) => {
    const globalElements = new Global(page)
    await globalElements.goToBaseUrl()
    await expect(page).toHaveURL(globalElements.baseUrl)

  })

  test(' Header LinkedIn button functionality', async ({ page, context }) => {
    const homePage = new HomePage(page);
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.clickTopLinkedInBt()
    ])
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/^https:\/\/www\.linkedin\.com\/.*/);
    await newPage.close()
  });

  test('Header Github button functionality', async ({ page, context }) => {
    const homePage = new HomePage(page);
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.clickTopGithubBt()
    ])
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://github.com/MRJOHN5ON')
    await newPage.close()
  });

  test('Footer LinkedIn button functionality', async ({ page, context }) => {
    const homePage = new HomePage(page);
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.clickFooterLinkedInBt()
    ])
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/^https:\/\/www\.linkedin\.com\/.*/);
    await newPage.close()
  });

  test('Footer Github button functionality', async ({ page, context }) => {
    const homePage = new HomePage(page);
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.clickFooterGithubBt()
    ])
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://github.com/MRJOHN5ON')
    await newPage.close()
  });



});

test('Each project box links to expected page', async ({ page }) => {
  const globalElements = new Global(page);

  // Navigate to the homepage
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

  
  const projectBoxes = await page.locator('.project-box');

  for (let key of Object.keys(expectedUrls)) {
    const i = Number(key);
    await projectBoxes.nth(i).click();
    await expect(page).toHaveURL(expectedUrls[i]);

    // Go back to the homepage
    if (i < Object.keys(expectedUrls).length - 1) {
      await page.goBack();
    }
  }
   

});

test.describe('Image are visible', async () =>{
  test.beforeEach(async ({ page }) => {
    const globalElements = new Global(page)
    await globalElements.goToBaseUrl();
    await expect(page).toHaveURL(globalElements.baseUrl)
  });

  test('First Profile Pic Visible', async ({page}) => {
    const homePage = new HomePage(page)
    await expect(homePage.profilePic1).toBeVisible()

  });

  test('Second Profile Pic Visible', async ({page}) => {
    const homePage = new HomePage(page)
    await expect(homePage.profilePic2).toBeVisible()
    
  });
 

});

test.describe('Hover Color Changes', () => {

  test('nav bar titles change color on hover', async ({ page }) => {
    
    const globalElements = new Global(page)
    const homePage = new HomePage(page)

    const defaultColor = 'rgb(255, 4, 4)';
    const hoverColor = 'rgb(0, 0, 0)';

    await globalElements.goToBaseUrl();
    await expect(page).toHaveURL(globalElements.baseUrl)
  
  
    await expect(homePage.navBar.topHomeButton).toHaveCSS('color', defaultColor);
    await expect(homePage.navBar.topAboutButton).toHaveCSS('color', defaultColor);
    await expect(homePage.navBar.topProjectsButton).toHaveCSS('color', defaultColor);
    await expect(homePage.navBar.topContactButton).toHaveCSS('color', defaultColor);
  
    await homePage.navBar.topHomeButton.hover();
    await expect(homePage.navBar.topHomeButton).toHaveCSS('color', hoverColor);
  
    await homePage.navBar.topAboutButton.hover();
    await expect(homePage.navBar.topAboutButton).toHaveCSS('color', hoverColor);
  
    await homePage.navBar.topProjectsButton.hover();
    await expect(homePage.navBar.topProjectsButton).toHaveCSS('color', hoverColor);
  
    await homePage.navBar.topContactButton.hover();
    await expect(homePage.navBar.topContactButton).toHaveCSS('color', hoverColor);
  });
  
  
  });
  
  









