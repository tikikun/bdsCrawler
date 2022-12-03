import startBrowser from './browser'
import { bdsCrawler } from './crawler'
import { listingItem } from './interfaces'





async function getDataList(): Promise<listingItem[]> {

    const data = await new bdsCrawler(await startBrowser(), 'https://batdongsan.com.vn/ban-can-ho-chung-cu-can-ho-hoang-quoc-viet', 1, 10).getMultiPage()
    return data
}

export { getDataList }