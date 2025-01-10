exports.HomePage = class HomePage {
    constructor(page) {
      this.page = page;
      this.navBar = new HomePage.NavBar(page);
      this.resumePDF = this.page.getByTestId('Download-resume-btn')
      this.coverLetterPDF = this.page.getByTestId('Download-CV-btn')
      this.topLinkedInBt = this.page.locator('a[href="https://www.linkedin.com/in/ryleyj"]').first()
      this.topGithubBt = this.page.locator('a[href="https://github.com/MRJOHN5ON"]').first()
      this.footerLinkedInBt = this.page.locator('a[href="https://www.linkedin.com/in/ryleyj"]').last()
      this.footerGithubBt = this.page.locator('a[href="https://github.com/MRJOHN5ON"]').last()
      this.profilePic1 = this.page.getByAltText('avatar')
      this.profilePic2 = this.page.getByAltText('My Photo')
    }
    async downloadResume(){
        await this.resumePDF.click();

    }
    async downloadCV(){
        await this.coverLetterPDF.click()
    }
    async clickTopLinkedInBt(){
        await this.topLinkedInBt.click()
    }

    async clickTopGithubBt(){
      await this.topGithubBt.click()
    }

    async clickFooterLinkedInBt(){
      await this.footerLinkedInBt.click()
    }

    async clickFooterGithubBt(){
      await this.footerGithubBt.click()
    }

    static NavBar = class Navbar {
        constructor(page) {
          this.page = page;
          this.topHomeButton = this.page.getByTestId('Nav-menu-home');
          this.topAboutButton = this.page.getByTestId('Nav-menu-about');
          this.topProjectsButton = this.page.getByTestId('Nav-menu-projects');
          this.topContactButton = this.page.getByTestId('Nav-menu-contact');
        }
        async clickTopHomeButton() {
          await this.topHomeButton.click();
        }
        async clickTopAboutButton() {
          await this.topAboutButton.click();
        }
        async clickTopProjectsButton() {
          await this.topProjectsButton.click();
        }
        async clickTopContactButton() {
          await this.topContactButton.click();
        }

    }


  };