import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;
let openAccountPage;
let addCustomerPage;
let customerListPage

test.beforeEach(async ({ page }) => {

   addCustomerPage = new  AddCustomerPage(page);
   openAccountPage = new OpenAccountPage(page);
   customerListPage = new CustomersListPage(page);
  /* 
  Pre-conditons:
  1. Open Add Customer page.
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

test('Assert manager can search customer by First Name', async ({ page }) => {

  await customerListPage.clickCustomersButton();
  await customerListPage.fillSearchInput(firstName);
  await customerListPage.assertTableContainsCustomer(firstName);
  await customerListPage.assertTableHasOnlyOneRow();
  /* 
  Test:
  1. Open Customers page.
  2. Fill the firstName to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
});
