exports.Postman = class Postman {
    constructor (page) {
        this.page = page;
        this.topGithubBt = this.page.locator('a[href="https://github.com/MRJOHN5ON/postmanAPI_testing"]').first()
        this.bottomGithubBt = this.page.locator('a[href="https://github.com/MRJOHN5ON/postmanAPI_testing"]').last()
        this.postmanLogo = this.page.getByAltText('Logo')
        this.googleSheetslink = this.page.getByRole('link', { name: 'Google Sheets Test Case Data'})
        this.req1Img = this.page.getByAltText('Adding Products to a Kit')
        this.nodeTestsLink = this.page.getByRole('link', {name : 'Click here!'})
        this.postman1Img = this.page.getByAltText('Exceeding 30 Items')
        this.jira1Img = this.page.getByAltText('Bug Report in JIRA')
        this.postman2Img = this.page.getByAltText('Non-existent Product IDs')
        this.jira2Img = this.page.locator('a [href="https://mrjohn5on.github.io/assets/images/p5.png"]')






    }
}