import { expect } from '@playwright/test';

export default class MobileAppPage {
    constructor(page) {
        this.page = page;
        this.youtubeIframeElement = this.page.locator('iframe').first();
        this.youtubeiFrame = this.page.frameLocator('iframe').first();
        this.youtubeTitle = this.page.getByText('Urban Lunch App Demonstration');
        this.accordionHeader = this.page.locator('button.accordion-header');
        this.accordionExpanded = this.page.locator('button.accordion-header.active');

        this.expandedAccordionImages = [
        this.page.getByAltText('Mind Map 1'),
        this.page.getByAltText('Mind Map 2'),
        this.page.getByAltText('Mind Map 3'),
        this.page.getByAltText('Mind Map 4'),
        this.page.getByAltText('Mind Map 5')
        ];
        
        this.tableElementFailed = this.page.locator('.status-failed');
    }

    async gotoMobileAppPage() {
        await this.page.goto('https://mrjohn5on.github.io/project2.html');
    }

    async expandAccordion() {
        await this.accordionHeader.click();
        await expect(this.accordionHeader).toHaveClass('accordion-header active');
        await expect(this.accordionExpanded).toBeVisible();
    }

    // YouTube iframe interaction methods
    async getYouTubePlayerState() {
        return this.page.evaluate(() => {
            const iframe = document.querySelector('iframe');
            if (!iframe) return null;
            return iframe.contentWindow.postMessage('{"event":"command","func":"getPlayerState","args":""}', '*');
        });
    }

    async waitForYouTubeIframeToLoad() {
        await this.page.waitForSelector('iframe', { state: 'attached' });
        // Wait for the iframe to be fully loaded
        await this.page.waitForTimeout(1000);
    }

    async checkYouTubeIframeAccessibility() {
        const iframe = this.page.locator('iframe').first();
        await expect(iframe).toHaveAttribute('title', 'YouTube video player');
        await expect(iframe).toHaveAttribute('allow', /accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture/);
    }
}