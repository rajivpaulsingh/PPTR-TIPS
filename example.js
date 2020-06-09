const puppeteer = require("puppeteer");
const puppeteerFirefox = require('puppeteer-firefox');

const devices = require("puppeteer/DeviceDescriptors");

describe("Tips and Tricks Test Suite", () => {

    let browser;
    let page;
    let browserFirefox;
    let pageFirefox;

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

    //Fake geolocation
    it('Geolocation test', async function() {
        //grant permission for geolocation change
        const context = browser.defaultBrowserContext();
        await context.overridePermissions('https://www.where-am-i.net/', ['geolocation']);

        await page.goto("https://www.where-am-i.net/");
        await page.waitForSelector('title');

        //change geolocation to the north pole
        await page.setGeolocation({ latitude: 88.8, longitude: -118.3 });

        //Extracting a text from an element
        const text = await page.$eval('#location', element => element.textContent)
        console.log('The faked location is: ' + text)
    })

    //Accessibility test
    it("Accessibility test", async function() {
        await page.goto("http://pptr.dev"); 
        await page.waitForSelector('title');

        const snapshot = await page.accessibility.snapshot();
        console.log(snapshot);
    });

    //Measuring website performance data
    it("Website performance data test", async function() {
        await page.goto("http://pptr.dev"); 
        await page.waitForSelector('title');

        //execute navigation api within the page context
        const metrics = await page.evaluate(() => JSON.stringify(window.performance));
        console.log(JSON.parse(metrics));
    });

    //Firefox test
    it("Firefox test", async function() {
        browserFirefox = await puppeteerFirefox.launch({ headless: true });
        pageFirefox = await browserFirefox.newPage();
        await pageFirefox.setDefaultTimeout(10000);

        await pageFirefox.goto("http://zero.webappsecurity.com/index.html");
        await pageFirefox.waitForSelector('#signin_button');
        await pageFirefox.waitFor(5000);
        await browserFirefox.close();
    });

    //Incognito browser test
    it("Accessibility test", async function() {
        const browser = await puppeteer.launch({ headless: false });
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        await page.goto("http://zero.webappsecurity.com/index.html");
        await page.waitForSelector('#signin_button');
        await page.waitFor(5000);
        await browser.close();
    });

})