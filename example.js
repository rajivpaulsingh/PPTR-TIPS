const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");

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
    
    //Take full page screenshot
    it("Screenshot test", async function() {
        await page.goto("http://www.example.com", { waitUntil: "networkidle0" });
        await page.screenshot({ path: "example.png", fullPage: true });
    });

    //Convert webpage to pdf
    it("PDF test", async function() {
        await page.goto("http://www.example.com", { waitUntil: "networkidle0" });
        await page.pdf({ path: "example.pdf", format: "A4"});
    });

    //Emulate devices
    it("Emulate devices test", async function() {
        await page.emulate(puppeteer.devices["iPhone X"]);
        await page.goto("https://pptr.dev");
        await page.waitFor(3000);
    });
})