import startBrowser from './browser'
import { bdsCrawler } from './crawler'
import { getDataList } from './tasks'
import express from 'express'



const app = express()
const port = 3000

app.get('/getPage', async (req, res) => {
    const dataList = await getDataList( parseInt(req.query.startpage as string), parseInt(req.query.endpage as string))
    res.send(dataList)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})