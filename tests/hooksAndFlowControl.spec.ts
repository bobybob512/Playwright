import {test} from '@playwright/test'

test.describe('suite1', () => {
    test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Charts').click()
    })

    test ('the first test', async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    })

    test ('navigate to datepicker page', async ({page}) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()
    })
})


test.describe('suite2', () => {
    test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    })

    test ('the first test', async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    })

    test ('navigate to datepicker page', async ({page}) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()
    })
})