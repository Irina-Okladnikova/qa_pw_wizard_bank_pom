import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName; 
let lastName;
let postCode;
let customerListPage;
let addCustomerPage;

test.beforeEach(async ({ page }) => {
  addCustomerPage = new  AddCustomerPage(page);
  customerListPage = new CustomersListPage(page);
 
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postCode = faker.location.zipCode();
 
   
   await addCustomerPage.open();
   await addCustomerPage.fillFirstName(firstName);
   await addCustomerPage.fillLastName(lastName);
   await addCustomerPage.fillPostCode(postCode);
   await addCustomerPage.clickAddCustomerButton();
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {
  await customerListPage.clickCustomersButton();
  await customerListPage.clickDeleteForLastRow();
  await customerListPage.assertCustomerNotInTable(firstName);

  await page.reload();

  await customerListPage.assertCustomerNotInTable(firstName);  
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
