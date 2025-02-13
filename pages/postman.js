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
        this.jira1Img = this.page.getByAltText('Bug Report in JIRA').first()
        this.postman2Img = this.page.getByAltText('Non-existent Product IDs')
        this.jira2Img = this.page.getByAltText('Bug Report in JIRA').last()
        this.req2Pdf = this.page.getByRole('link', {name: 'Detailed Requirements PDF'})
        this.resultsTable = this.page.getByAltText('Results')
        this.footerHomeButton = this.page.getByRole('link', {name: 'Home Page'})
        this.footerProjectBankButton = this.page.getByRole('link', {name: 'Project Bank'})
        this.emailLink = this.page.getByRole('link', {name: 'ryleyjohnsonemail@gmail.com'})
    }

    async goToPostmanProject() {
        await this.page.goto('https://mrjohn5on.github.io/project1.html')
    }

    async clickTopGithubBt() {
        await this.topGithubBt.click()
    }
    async clickBottomGithubBt() {
        await this.bottomGithubBt.click()
    }
   
    async clickGoogleSheets() {
        await this.googleSheetslink.click()
    }
    async clickReq1Img() {
        await this.req1Img.click()
    }
    async clickNodeTestsLink() {
        await this.nodeTestsLink.click()
    }
    async clickPostman1Img() {
        await this.postman1Img.click()
    }
    async clickJira1Img() {
        await this.jira1Img.click()
    }
    async clickPostman2Img() {
        await this.postman2Img.click()
    }
    async clickJira2Img() {
        await this.jira2Img.click()
    }
    async clickReq2Pdf() {
        await this.req2Pdf.click()
    }
    async clickResultsTable() {
        await this.resultsTable.click()
    }
    async clickFooterHomeButton() {
        await this.footerHomeButton.click()
    }
    async clickFooterProjectBankButton() {
        await this.footerProjectBankButton.click()
    }
    async clickEmailLink() {
        await this.emailLink.click()
    }

   
}