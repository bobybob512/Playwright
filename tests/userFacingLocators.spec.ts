import {test} from '@playwright/test';
import { filter } from 'rxjs-compat/operator/filter';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    });

test('Locators syntacs rules', async ({page}) =>{
    //by tag name
    page.locator('input');

    //by ID
    page.locator('#inputEmail1');

    //by classvalue
    page.locator('.shape-rectangle');

    //by attribute
    page.locator('[placeholder="Email"]');

    //by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    //by combining different selectors
    page.locator('input[placeholder="Email"]');

    //by partial text match
    page.locator(':text("Using")');

    //by exact text match
    page.locator(':text-is("Using the Grid")');
});

test('User facing locators', async ({page}) =>{
await page.getByRole('textbox', {name: "Email"}).first().click()
await page.getByRole('button', {name: "Sign in"}).first().click()

await page.getByLabel('Email').first().click()

await page.getByPlaceholder('Jane Doe').click()

await page.getByText('Using the Grid').click()

//await page.getByTitle('IoT Dashboard').click()
//TestID is an identifier you define in your,,,,search with search button

await page.getByTestId('SignIn').click()
})

test('locating child elements', async({page}) =>{
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //try to avoid using first , last...because the order can change
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    //try to avoid this
    await page.locator('nb-card').nth(1).getByRole('button').click()
})

test('locating parent elements', async({page}) =>{
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card'). filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card'). filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card'). filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
        .getByRole('textbox', {name: "Password"}).click()

    //use xpath just when you want to go up a level
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click() 
})