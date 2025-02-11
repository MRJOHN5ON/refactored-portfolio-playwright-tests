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

  test('should contain github link to project', async ({ page, context }) => {
  const socialQaProjectPage = new SocialQaProjectPage(page);
    await socialQaProjectPage.goToSocialQaProjectPage();
    await expect(socialQaProjectPage.githubLink).toBeVisible();
    await expect(socialQaProjectPage.githubLink).toHaveAttribute('href', 'https://github.com/MRJOHN5ON/Refactoring-using-a-page-object-model');
    
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await socialQaProjectPage.githubLink.click()
  ]);

    await expect(newPage).toHaveURL('https://github.com/MRJOHN5ON/Refactoring-using-a-page-object-model');
  });

  test('github icon should change color on hover', async ({ page }) => {
    const socialQaProjectPage = new SocialQaProjectPage(page);
    await socialQaProjectPage.goToSocialQaProjectPage();
    await expect(socialQaProjectPage.githubLink).toBeVisible();

    const beforeColor = await socialQaProjectPage.githubLink.evaluate(el => getComputedStyle(el, "::before").color);

    await socialQaProjectPage.githubLink.hover();
    const afterColor = await socialQaProjectPage.githubLink.evaluate(el => getComputedStyle(el, "::before").color);
    
    await expect(beforeColor).not.toBe(afterColor);
  });

  test('all h2 headings should be the correct color (#ff007f)', async ({ page }) => {
    const socialQaProjectPage = new SocialQaProjectPage(page);
    await socialQaProjectPage.goToSocialQaProjectPage();

    const h2Headers = page.locator('h2');
    const count = await h2Headers.count();

    for (let i = 0; i < count; i++) {
      await expect(h2Headers.nth(i)).toHaveCSS('color', 'rgb(255, 0, 127)');
    }
  });
  test('all h3 headings should be the correct color (#00ffcc)', async ({ page }) => {
    const socialQaProjectPage = new SocialQaProjectPage(page);
    await socialQaProjectPage.goToSocialQaProjectPage();

    const h3Headers = page.locator('h3');
    const count = await h3Headers.count();
    for (let i = 0; i < count; i++) {
      await expect(h3Headers.nth(i)).toHaveCSS('color', 'rgb(0, 255, 204)');
    }

    });

    test.describe('footer links should be visible and go to the correct page', () => {
      test('homepage link and project bank link', async ({ page }) => {
        const socialQaProjectPage = new SocialQaProjectPage(page);
        await socialQaProjectPage.goToSocialQaProjectPage();
        await expect(page).toHaveURL('https://mrjohn5on.github.io/socialqa.html');

        await expect(socialQaProjectPage.homePageLink).toBeVisible();
        await expect(socialQaProjectPage.projectBankLink).toBeVisible();

        await socialQaProjectPage.homePageLink.click();
        await expect(page).toHaveURL('https://mrjohn5on.github.io/index.html');

        await page.goBack();

        await socialQaProjectPage.projectBankLink.click();
        await expect(page).toHaveURL('https://mrjohn5on.github.io/#projects');
      });

    });
