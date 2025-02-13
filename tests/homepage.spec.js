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

  const getMenuOptionLocator = async (page, testId) => {
    const globalElements = new Global(page);
    await globalElements.goToBaseUrl();
    await expect(page).toHaveURL(globalElements.baseUrl);
    return page.getByTestId(testId);
  }

  // Loop for default color tests
  for (const { name, testId } of menuItemLocators) {
    test(`Menu Item ${name} displays default color`, async ({ page }) => {
      const defaultColor = 'rgb(255, 4, 4)';
      
      const locator = await getMenuOptionLocator(page, testId);
      await expect(locator).toHaveCSS('color', defaultColor);
    });
  }

  // Loop for hover color tests
  for (const { name, testId } of menuItemLocators) {
    test(`Menu Item ${name} changes color on hover`, async ({ page }) => {
      const locator = await getMenuOptionLocator(page, testId);
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
    { dataTestId: 'project-box1', expectedUrl: 'https://testlio.com/job/freelance-uber-sf/' },
    { dataTestId: 'project-box2', expectedUrl: 'https://mrjohn5on.github.io/socialqa.html' },
    { dataTestId: 'project-box3', expectedUrl: 'https://mrjohn5on.github.io/project1.html' },
    { dataTestId: 'project-box4', expectedUrl: 'https://mrjohn5on.github.io/project2.html' },
    { dataTestId: 'project-box5', expectedUrl: 'https://mrjohn5on.github.io/project3.html' },
    { dataTestId: 'project-box6', expectedUrl: 'https://mrjohn5on.github.io/supernova.html' },
    { dataTestId: 'project-box7', expectedUrl: 'https://mrjohn5on.github.io/project4.html' },
    { dataTestId: 'project-box8', expectedUrl: 'https://github.com/MRJOHN5ON/learning_playwright' },
    { dataTestId: 'project-box9', expectedUrl: 'https://mrjohn5on.github.io/urbanscooters.html' },
    { dataTestId: 'project-box10', expectedUrl: 'https://github.com/MRJOHN5ON/E2E-webdriverIO-' },
  ];


  for (const { dataTestId, expectedUrl } of projectBoxes) {
    test(`Project Box ${dataTestId} links to ${expectedUrl}`, async ({ page }) => {
      const projectBox = page.getByTestId(dataTestId);
      await projectBox.click();
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(expectedUrl);
    });
  };


});







