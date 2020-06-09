const puppeteer = require("puppeteer");

describe("Tips and Tricks Test Suite", () => {

    let browser;
    let page;

    before(async function() {
        browser = await puppeteer.launch({ headless: true });
        page = await browser.newPage();
        await page.setDefaultTimeout(10000);
    })

    after(async function() {
        await browser.close();
    })
    
    it("Screenshot test", async function() {
        await page.goto("http://www.example.com", { waitUntil: "networkidle0" });
        await page.screenshot({ path: "example.png", fullPage: true });
    });
})