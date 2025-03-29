import { test, expect } from '@playwright/test';
import { StepsOfSDLC } from '../pages/Steps_Of_The_SDLC.js';

test.describe('Steps of SDLC Project Page Tests', () => {
  
  test('should display the correct page title', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    await expect(page).toHaveURL('https://mrjohn5on.github.io/project3.html');
    await expect(page).toHaveTitle('Working The Steps Of The SDLC For Web Based Testing');
  });

  test('should have all section headers visible', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    
    await expect(sdlcPage.requirementAnalysisHeader).toBeVisible();
    await expect(sdlcPage.equivalencyPartitionsHeader).toBeVisible();
    await expect(sdlcPage.testCreationHeader).toBeVisible();
    await expect(sdlcPage.testResultsHeader).toBeVisible();
  });

  test('should display all section images', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    
    await expect(sdlcPage.requirementAnalysisImage).toBeVisible();
    await expect(sdlcPage.equivalencyPartitionsImage).toBeVisible();
    await expect(sdlcPage.testCreationImage).toBeVisible();
    await expect(sdlcPage.testResultsImage).toBeVisible();
  });

  test('should contain requirement analysis text', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    
    const text = await sdlcPage.getRequirementAnalysisText();
    expect(text).toContain('Upon receiving the requirements from the development team');
  });

  test('should contain equivalency partitions text', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    
    const text = await sdlcPage.getEquivalencyPartitionsText();
    expect(text).toContain('After reviewing the requirements');
  });

  test('should have correct copyright information', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    
    await expect(sdlcPage.copyrightText).toBeVisible();
    const copyrightText = await sdlcPage.copyrightText.textContent();
    expect(copyrightText).toContain('© 2024 Ryley Johnson');
  });

  test('should have correct email contact information', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    
    await expect(sdlcPage.contactEmailLabel).toBeVisible();
    await expect(sdlcPage.contactEmail).toBeVisible();
    await expect(sdlcPage.contactEmail).toHaveAttribute('href', 'mailto:ryleyjohnsonemail@gmail.com');
  });

  test.describe('footer links should be visible and navigate to correct pages', () => {
    test('home page link should navigate to index page', async ({ page }) => {
      const sdlcPage = new StepsOfSDLC(page);
      await sdlcPage.navigate();
      
      await expect(sdlcPage.homePageLink).toBeVisible();
      await expect(sdlcPage.homePageLink).toHaveAttribute('href', 'index.html');
      
      await sdlcPage.clickHomePageLink();
      await expect(page).toHaveURL(/.*index\.html$/);
    });

    test('project bank link should navigate to projects section', async ({ page }) => {
      const sdlcPage = new StepsOfSDLC(page);
      await sdlcPage.navigate();
      
      await expect(sdlcPage.projectBankLink).toBeVisible();
      await expect(sdlcPage.projectBankLink).toHaveAttribute('href', 'https://mrjohn5on.github.io/#projects');
      
      await sdlcPage.clickProjectBankLink();
      await expect(page).toHaveURL('https://mrjohn5on.github.io/#projects');
    });
  });

  test('all section headers should have consistent styling', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    
    const headers = [
      sdlcPage.requirementAnalysisHeader,
      sdlcPage.equivalencyPartitionsHeader,
      sdlcPage.testCreationHeader,
      sdlcPage.testResultsHeader
    ];
    
    // Get the color of the first header
    const firstHeaderColor = await headers[0].evaluate(el => getComputedStyle(el).color);
    
    // Check that all headers have the same color
    for (const header of headers) {
      await expect(header).toHaveCSS('color', firstHeaderColor);
    }
  });
  
  test('contact email link opens mailto', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    
    await expect(sdlcPage.contactEmail).toHaveAttribute('href', 'mailto:ryleyjohnsonemail@gmail.com');
  });

  test('page layout remains consistent at different viewport sizes', async ({ page }) => {
    const sdlcPage = new StepsOfSDLC(page);
    
    // Test on desktop size
    await page.setViewportSize({ width: 1280, height: 720 });
    await sdlcPage.navigate();
    await expect(sdlcPage.pageTitle).toBeVisible();
    
    // Test on tablet size
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(sdlcPage.pageTitle).toBeVisible();
    
    // Test on mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(sdlcPage.pageTitle).toBeVisible();
  });
  
  test('visitor counter link should be visible', async ({ page, context }) => {
    const sdlcPage = new StepsOfSDLC(page);
    await sdlcPage.navigate();
    
    await expect(sdlcPage.visitorCounterLink).toBeVisible();
    await expect(sdlcPage.visitorCounterLink).toHaveAttribute('href', 'http://www.freevisitorcounters.com');
  });
});