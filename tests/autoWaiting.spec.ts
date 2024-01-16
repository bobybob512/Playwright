import {test, expect} from '@playwright/test';
import { filter } from 'rxjs-compat/operator/filter';
import { timeout } from 'rxjs-compat/operator/timeout';

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout +2000) //this will override timout and will increase the timoeut for every test in this test suite
    });

test('Auto waiting', async({page}) =>{
    const successButton = page.locator('.bg-success')
    //await successButton.click()

    //const text = await successButton.textContent()
    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')
  
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async({page})=>{
    const successButton = page.locator('.bg-success')

    //wait for element
    //await page.waitForSelector('.bg-succes')

    //wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for network calls to be completed (NOT RECOMMENDED)
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timouts', async({page}) =>{
    test.setTimeout(10000) //test timoeut
    test.slow() //increases the test timeout X 3
    const succesButton = page.locator('.bg-success')

    //await succesButton.click({timeout: 16000}) --action timeout
    await succesButton.click()
})