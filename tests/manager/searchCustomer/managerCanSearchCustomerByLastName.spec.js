import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';

let firstName;
let lastName;
let postCode;
let addCustomerPage;
let customerListPage;
let bankManagerMainPage;
test.beforeEach(async ({ page }) => {

  addCustomerPage = new  AddCustomerPage(page);
  customerListPage = new CustomersListPage(page);
  bankManagerMainPage = new BankManagerMainPage(page);
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can search customer by Last Name', async ({ page }) => {

  await bankManagerMainPage.clickCustomersButton();
  await customerListPage.fillSearchInput(lastName);
  await customerListPage.assertTableContainsCustomer(lastName);
  await customerListPage.assertTableHasOnlyOneRow();
  /* 
  Test:
  1. Open Customers page
  2. Fill the lastName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
