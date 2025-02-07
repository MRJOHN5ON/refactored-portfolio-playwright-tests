import { test, expect } from '@playwright/test';
import { SocialQaProjectPage } from '../pages/socialQaProjectPage.js';


  test('should display the correct page title', async ({ page }) => {
    const socialQaProjectPage = new SocialQaProjectPage(page);
    await socialQaProjectPage.goToSocialQaProjectPage();
    await expect(page).toHaveURL('https://mrjohn5on.github.io/socialqa.html');
    await expect(page).toHaveTitle('Social QA Project');
  });

  test('should display header photo', async ({ page }) => {
    const socialQaProjectPage = new SocialQaProjectPage(page);
    await socialQaProjectPage.goToSocialQaProjectPage();
    await expect(socialQaProjectPage.headerPhoto).toBeVisible();
  });

