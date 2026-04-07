import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.locator('#userSelect');
    this.currencyDropDown = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
    
  }
  async assertCurrencyDropDownHasValue(value) {
  await expect(this.currencyDropDown).toHaveValue(value);
}
  async assertCustomerDropDownHasText(expectedFullName) {
    await expect(this.customerDropDown).toHaveText(expectedFullName);
  }
  async assertCustomerDropDownContainsOption(fullName) {
  await expect(this.customerDropDown).toContainText(fullName);
  }
  
async selectCurrency(currency) {
  await this.currencyDropDown.selectOption(currency);
}

 async selectCustomer(fullName) {
  await this.customerDropDown.selectOption({ label: fullName });
}
async clickProcessButton() {
  await this.processButton.click();
}
}