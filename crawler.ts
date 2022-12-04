import { Browser } from 'puppeteer'
import startBrowser from './browser'
import { listingItem } from './interfaces'


class bdsCrawler {
    pupBrowser: Browser
    pageUrl: string
    startPage: number
    endPage: number
    constructor(pupBrowser: Browser, pageUrl: string, startPage: number, endPage: number) {
        this.pupBrowser = pupBrowser
        this.pageUrl = pageUrl
        this.startPage = startPage
        this.endPage = endPage
    }

    async getMultiPage() {
        var result: listingItem[] = []
        const listPage = this.#makeCrawlArray()

        await Promise.all(listPage.map(
            async (page) => {
                const itemlist = await this.#getItemArray(page)
                console.log(`Done fetching for page: ${page}`)
                result = result.concat(itemlist)
            }
        ))
        console.log('Done fetching all return data')
        return result
    }

    async #getItemArray(pageUrl: string): Promise<listingItem[]> {
        const itemList = await this.#handleListPage(pageUrl)
        const resultArray = itemList.map(async el => {
            const item = await el.$eval('a', (a, pageUrl) => {

                const payload: listingItem = {
                    title: a.getAttribute('title'),
                    price: a.querySelector('.re__card-config-price')?.textContent || null,
                    area: a.querySelector('.re__card-config-area')?.textContent || null,
                    publishedAt: a.querySelector('.re__card-published-info-published-at')?.getAttribute('aria-label') || null,
                    url: pageUrl
                }

                return payload
            }, pageUrl
            )
            return item
        })

        const result = Promise.all(resultArray)
        return result
    }

    async #handleListPage(pageUrl: string) {
        const page = await this.pupBrowser.newPage()
        await page.goto(pageUrl)
        await page.waitForSelector('span.re__card-config-price_per_m2')
        //await new Promise(r => setTimeout(r, 2000))
        const itemList = await page.$$('#product-lists-web > div')
        return itemList
    }


    #makeCrawlArray(): string[] {
        const result: string[] = []
        for (let index = this.startPage; index < this.endPage; index++) {
            result.push(this.pageUrl + `p${index}?sortValue=1`)
        }
        return result
    }

}

export { bdsCrawler }
