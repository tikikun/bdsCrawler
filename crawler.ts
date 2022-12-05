import { Browser, ElementHandle, Page } from 'puppeteer'
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
        while ( listPage.length){
        await Promise.all(listPage.splice(0,5).map(
            async (page) => {
                const itemArrayData = await this.#getItemArray(page)
                const itemlist = await itemArrayData.tasksList
                const tab = itemArrayData.page
                console.log(`Done fetching for page: ${page}`)
                result = result.concat(itemlist)
                console.log(`Close tab for page ${page} now`)
                tab.close()
            }
        ))}
        console.log('Done fetching all return data')
        this.pupBrowser.close()
        return result
    }

    async #getItemArray(pageUrl: string) {
        const listPageInfo = await this.#handleListPage(pageUrl)
        const itemList = listPageInfo.itemList
        const page = listPageInfo.page
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

        const taskslList = Promise.all(resultArray)
        
        return {tasksList:taskslList,page:page}
    }

    async #handleListPage(pageUrl: string) {
        const page = await this.pupBrowser.newPage()
        await page.setDefaultNavigationTimeout(300000)
        await page.goto(pageUrl)
        await page.waitForSelector('span.re__card-config-price_per_m2')
        //await new Promise(r => setTimeout(r, 2000))
        const itemList = await page.$$('#product-lists-web > div')
        const listPageData:{ itemList: ElementHandle<HTMLDivElement>[], page: Page } = {itemList:itemList,page:page}
        return listPageData
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
