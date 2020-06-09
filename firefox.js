const puppeteer = require('puppeteer-firefox');

describe("Tips and Tricks Test Suite", () => {
    
    it("Firefox test", async function() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setDefaultTimeout(10000);

        await page.goto("http://zero.webappsecurity.com/index.html");
        await page.waitForSelector('#signin_button');
        await page.waitFor(5000);
        await browser.close();
    });
})