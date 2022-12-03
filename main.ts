import startBrowser from './browser'
import { bdsCrawler } from './crawler'




(async () => {

    const data = await new bdsCrawler(await startBrowser(), 'https://batdongsan.com.vn/ban-can-ho-chung-cu-can-ho-hoang-quoc-viet', 1, 10).getMultiPage()
    console.log(data)

})()