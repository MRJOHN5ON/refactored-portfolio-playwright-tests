
exports.Global = class Global {
    constructor(page) {
      this.page = page
      this.baseUrl = 'https://mrjohn5on.github.io/'
    }
  
    async goToBaseUrl() {
      await this.page.goto(this.baseUrl)

    }
  };
  