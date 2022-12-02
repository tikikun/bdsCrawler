import puppeteer, { Browser } from 'puppeteer';


async function startBrowser(): Promise<Browser> {
    let browser : Browser
    let config: object = {}

    if (process.env.headless === '1') {
        config = { 'headless': true }
    } else {
        config = { 'headless': false }
    }

    browser = await puppeteer.launch(config)

    return browser

}

export default startBrowser