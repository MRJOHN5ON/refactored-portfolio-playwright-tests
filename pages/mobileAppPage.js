exports.mobileAppPage = class mobileAppPage {
    constructor(page) {
        this.page = page;
        this.youtubeiFrame = this.page.getByLabel('YouTube video player')
        this.accordionHeader = this.page.locator('button.accordion-header')
        this.accordionExpanded = this.page.locator('button.accordion-header.active')
        this.expandedAccordionImg1 = this.page.getByAltText('Mind Map 1')
        this.expandedAccordionImg2 = this.page.getByAltText('Mind Map 2')
        this.expandedAccordionImg3 = this.page.getByAltText('Mind Map 3')
        this.expandedAccordionImg4 = this.page.getByAltText('Mind Map 4')
        this.expandedAccordionImg5 = this.page.getByAltText('Mind Map 5')
        this.tableElementFailed = this.page.locator('.status-failed')




        


    }

    async gotoMobileAppPage() {
        await this.page.goto('https://mrjohn5on.github.io/project2.html')
    }

}