import { expect } from '@playwright/test';

export default class MobileAppPage {
    constructor(page) {
        this.page = page;
        this.youtubeiFrame = this.page.getByLabel('YouTube video player')
        this.youtubeTitle = this.page.getByText('Urban Lunch App Demonstration')
        this.accordionHeader = this.page.locator('button.accordion-header')
        this.accordionExpanded = this.page.locator('button.accordion-header.active')

        this.expandedAccordionImages = [
        this.page.getByAltText('Mind Map 1'),
        this.page.getByAltText('Mind Map 2'),
        this.page.getByAltText('Mind Map 3'),
        this.page.getByAltText('Mind Map 4'),
        this.page.getByAltText('Mind Map 5')
        ]
        
        this.tableElementFailed = this.page.locator('.status-failed')




        


    }

    async gotoMobileAppPage() {
        await this.page.goto('https://mrjohn5on.github.io/project2.html')
    }

    async expandAccordion() {
        await this.accordionHeader.click();
        await expect(this.accordionHeader).toHaveClass('accordion-header active');
        await expect(this.accordionExpanded).toBeVisible();
    }

}