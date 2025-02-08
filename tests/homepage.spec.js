import { test, expect, } from '@playwright/test';
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
    await homePage.clickTopHomeButton();
    await expect(page).toHaveURL('https://mrjohn5on.github.io/#home');
  });

  test('navigate to about', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTopAboutButton();
    await expect(page).toHaveURL('https://mrjohn5on.github.io/#about');
  });
  test('navigate to projects', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTopProjectsButton();
    await expect(page).toHaveURL('https://mrjohn5on.github.io/#projects');
  });

  test('navigate to contact', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTopContactButton();
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

test.describe('Image are visible', async () => {
  test.beforeEach(async ({ page }) => {
    const globalElements = new Global(page)
    await globalElements.goToBaseUrl();
    await expect(page).toHaveURL(globalElements.baseUrl)
  });

  test('First Profile Pic Visible', async ({ page }) => {
    const homePage = new HomePage(page)
    await expect(homePage.profilePic1).toBeVisible()

  });

  test('Second Profile Pic Visible', async ({ page }) => {
    const homePage = new HomePage(page)
    await expect(homePage.profilePic2).toBeVisible()

  });


});

test.describe('Hover Color Changes', () => {
  const menuItemLocators = [
    { name: 'Home', testId: 'Nav-menu-home' },
    { name: 'About', testId: 'Nav-menu-about' },
    { name: 'Projects', testId: 'Nav-menu-projects' },
    { name: 'Contact', testId: 'Nav-menu-contact' },
  ];

  // Loop for default color tests
  for (const { name, testId } of menuItemLocators) {
    test(`Menu Item ${name} displays default color`, async ({ page }) => {
      const globalElements = new Global(page);
      await globalElements.goToBaseUrl();
      await expect(page).toHaveURL(globalElements.baseUrl);

      const locator = page.getByTestId(testId);
      const defaultColor = 'rgb(255, 4, 4)';
      await expect(locator).toHaveCSS('color', defaultColor);
    });
  }

  // Loop for hover color tests
  for (const { name, testId } of menuItemLocators) {
    test(`Menu Item ${name} changes color on hover`, async ({ page }) => {
      const globalElements = new Global(page);
      await globalElements.goToBaseUrl();
      await expect(page).toHaveURL(globalElements.baseUrl);

      const locator = page.getByTestId(testId);
      const hoverColor = 'rgb(0, 0, 0)';
      await locator.hover();
      await expect(locator).toHaveCSS('color', hoverColor);
    });
  }
});


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
      const projectBoxesLocator = page.locator('.project-box');
      await projectBoxesLocator.nth(index).click();
      await expect(page).toHaveURL(expectedUrl);
    });
  };


});







