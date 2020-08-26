/**
 * @jest-environment node
 */
const puppeteer = require("puppeteer");
const fs = require('fs').promises

describe('My test (only work with server)', () => {
  test('check if can order by status (done or undone)', async () => {
    let browser = await puppeteer.launch({ args: [
      `--window-size=1280,768`,
    ], headless: false, slowMo: 100
    });
    let page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#sortByDone', {visible: true});
    const sortButtonDone = await page.$('#sortByDone');
    await sortButtonDone.click();
    const doneButton = await page.$('#doneButton_0');
    let doneButtonInner = await (await doneButton.getProperty('innerText')).jsonValue();
    expect(doneButtonInner).toBe('UNDONE')
    const sortButtonUnDone = await page.$('#sortByUnDone');
    await sortButtonUnDone.click();
    const unDoneButton = await page.$('#doneButton_0');
    let unDoneButtonInner = await (await unDoneButton.getProperty('innerText')).jsonValue();
    expect(unDoneButtonInner).toBe('DONE')
  }, 50000);
  test('check if the done button changes the status of the ticket (server needed)', async () => {
    const data = await fs.readFile('../server/data.json');
    const parsedData = JSON.parse(data);
    let browser = await puppeteer.launch({ args: [
      `--window-size=1280,768`,
    ], headless: false, slowMo: 100
    });
    let page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#doneButton_0', {visible: true});
    const button = await page.$('#doneButton_0');
    await button.click();
    setTimeout( async () => {
      const updateData  = await fs.readFile('../server/data.json')
      const parsedUpdatedData = JSON.parse(updateData)
      expect(parsedUpdatedData[0].updated).toBe(!parsedData[0].updated)
      browser.close()
    }, 5000);
  }, 50000)
})



