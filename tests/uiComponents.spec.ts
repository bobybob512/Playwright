import {test, expect} from '@playwright/test';

test.beforeEach(async({page}) =>{
    await page.goto('http://localhost:4200/')

})

test.describe('Form layouts page', () => {
    test.beforeEach( async({page}) =>{
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page}) =>{
        const usingTheGridEmailInput = page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox', {name: "Email"})
        
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test@test.com', {delay: 200}) //delay between every letter when fiiling the input field

        //generic assertions
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect (inputValue).toEqual('test@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test.com')
    })
})