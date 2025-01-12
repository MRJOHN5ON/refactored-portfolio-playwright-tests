import { expect } from "@playwright/test";

exports.Global = class Global {
    constructor(page) {
      this.page = page;
    }
  
    async goToBaseUrl() {
      const baseUrl = 'https://mrjohn5on.github.io/';
      await this.page.goto(baseUrl)
      await expect(this.page).toHaveURL(baseUrl)
    }
  };
  