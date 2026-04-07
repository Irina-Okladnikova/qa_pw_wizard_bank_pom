import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.lastRow = page.locator('tbody tr').last();
    this.searchInput = page.getByPlaceholder('Search Customer');

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async assertLastRowContainsFirstName(firstName) {
  await expect(this.lastRow).toContainText(firstName);
}
  async assertLastRowContainsLastName(lastName) {
    await expect(this.lastRow).toContainText(lastName);
  }
  async assertLastRowContainsPostCode(postCode) {
    await expect(this.lastRow).toContainText(postCode)
  }
  async assertNoAccountNumber() {
    await expect(this.lastRow.locator('span')).not.toBeAttached();
  } 
 async assertCustomerNotInTable(name) {
  await expect(this.page.locator('tbody')).not.toContainText(name);
}
 async assertLastRowHasAccountNumber() {
  await expect(this.lastRow.locator('span')).toBeAttached();
}
async fillSearchInput(value) {
  await this.searchInput.fill(value);
}

async assertTableContainsCustomer(name) {
  await expect(this.page.locator('tbody')).toContainText(name);
}

async assertTableHasOnlyOneRow() {
  await expect(this.page.locator('tbody tr')).toHaveCount(1);
}
async clickDeleteForCustomer(firstName) {
  const row = this.page.locator('tbody tr').filter({ hasText: firstName });
  await row.getByRole('button', { name: 'Delete' }).click();
}
}
