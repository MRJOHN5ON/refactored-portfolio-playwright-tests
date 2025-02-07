exports.SocialQaProjectPage = class SocialQaProjectPage {
  constructor(page) {
    this.page = page;
    this.headerPhoto = this.page.getByAltText('Social QA Logo')
    
    
    
  }
  async goToSocialQaProjectPage() {
    await this.page.goto('https://mrjohn5on.github.io/socialqa.html');
  }

}