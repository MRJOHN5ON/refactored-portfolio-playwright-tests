exports.StepsOfSDLC = class StepsOfSDLC {
  constructor(page) {
    this.page = page;
    
    // Page elements 
    this.pageTitle = this.page.getByRole('heading', { name: 'Working The Steps Of The SDLC For Web Based Testing', level: 1 });
    this.springText = this.page.getByText('Spring 2024', { exact: true });
    
    // Section headers 
    this.requirementAnalysisHeader = this.page.getByRole('heading', { name: 'Requirement Analysis', level: 2 });
    this.equivalencyPartitionsHeader = this.page.getByRole('heading', { name: 'Equivalency Partitions & Boundary Values', level: 2 });
    this.testCreationHeader = this.page.getByRole('heading', { name: 'Test Creation & Execution', level: 2 });
    this.testResultsHeader = this.page.getByRole('heading', { name: 'Test Results Stats', level: 2 });
    
    // Images 
    this.requirementAnalysisImage = this.page.getByAltText('Requirement Analysis');
    this.equivalencyPartitionsImage = this.page.getByAltText('Equivalency Partitions & Boundary Values');
    this.testCreationImage = this.page.getByAltText('Test Creation & Execution');
    this.testResultsImage = this.page.getByAltText('stats');
    
    // Paragraph content 
    this.requirementAnalysisParagraph = this.page.getByText('Upon receiving the requirements from the development team');
    this.equivalencyPartitionsParagraph = this.page.getByText('After reviewing the requirements, I concluded');
    
    // Footer elements 
    this.copyrightText = this.page.getByText('© 2024 Ryley Johnson', { exact: true });
    this.homePageLink = this.page.getByRole('link', { name: 'Home Page' });
    this.projectBankLink = this.page.getByRole('link', { name: 'Project Bank' });
    this.contactEmailLabel = this.page.getByText('Contact me:');
    this.contactEmail = this.page.getByRole('link', { name: 'ryleyjohnsonemail@gmail.com' });
    this.visitorCounterLink = this.page.getByRole('link', { name: 'Freevisitorcounters.com' });
  }

  // Navigation methods
  async navigate() {
    await this.page.goto('https://mrjohn5on.github.io/project3.html');
  }
  
  async clickHomePageLink() {
    await this.homePageLink.click();
  }
  
  async clickProjectBankLink() {
    await this.projectBankLink.click();
  }
  
  async clickContactEmail() {
    await this.contactEmail.click();
  }
  
  // Verification methods
  async verifyPageLoaded() {
    await this.pageTitle.waitFor({ state: 'visible' });
    return await this.pageTitle.isVisible();
  }
  
  async verifyAllSectionsVisible() {
    const sections = [
      this.requirementAnalysisHeader,
      this.equivalencyPartitionsHeader,
      this.testCreationHeader,
      this.testResultsHeader
    ];
    
    for (const section of sections) {
      await section.waitFor({ state: 'visible' });
    }
    
    return sections.every(async section => await section.isVisible());
  }

  async verifyAllImagesVisible() {
    const images = [
      this.requirementAnalysisImage,
      this.equivalencyPartitionsImage,
      this.testCreationImage,
      this.testResultsImage
    ];
    
    for (const image of images) {
      await image.waitFor({ state: 'visible' });
    }
    
    return images.every(async image => await image.isVisible());
  }
  
  // Get page sections content
  async getRequirementAnalysisText() {
    return await this.requirementAnalysisParagraph.textContent();
  }
  
  async getEquivalencyPartitionsText() {
    return await this.equivalencyPartitionsParagraph.textContent();
  }
  
  // Get page metadata
  async getPageTitle() {
    return await this.page.title();
  }
  
  async getContactEmail() {
    return await this.contactEmail.textContent();
  }
}