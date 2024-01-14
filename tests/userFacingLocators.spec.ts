import {test, expect} from '@playwright/test';
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

test('Reusing the locators', async({page}) =>{
    const basicForm = page.locator('nb-card'). filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const passwordField = basicForm.getByRole('textbox', {name: "Password"})

    await emailField.fill('test@test.com')
    await passwordField.fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async({page}) =>{
    //single test value
    const basicForm = page.locator('nb-card'). filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect (allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async({page}) =>{
    //general assertions...executes immediately because there is noawait 
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion...await waits for 5 sec 
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion - can continue the execution even if the assertion has failed - Not A Really Good Practice
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
})
