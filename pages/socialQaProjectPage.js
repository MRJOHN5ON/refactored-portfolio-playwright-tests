exports.SocialQaProjectPage = class SocialQaProjectPage {
  constructor(page) {
    this.page = page;
    this.headerPhoto = this.page.getByAltText('Social QA Logo')
    this.githubLink = this.page.locator('a[href="https://github.com/MRJOHN5ON/Refactoring-using-a-page-object-model"]')
    this.homePageLink = this.page.getByRole('link', { name: 'Home Page'})
    this.projectBankLink = this.page.getByRole('link', { name: 'Project Bank'})

    
    
    
  }
  async goToSocialQaProjectPage() {
    await this.page.goto('https://mrjohn5on.github.io/socialqa.html');
  }

}