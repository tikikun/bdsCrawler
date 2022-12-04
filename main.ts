import startBrowser from './browser'
import { bdsCrawler } from './crawler'
import { getDataList } from './tasks'
import express, { NextFunction, Request, Response } from 'express'



const app = express()
const port = 3000

app.use(logging)

app.get('/getPage', async (req, res, next) => {
    const startPage = req.query.startpage as string
    const endPage = req.query.endpage as string
    if (startPage === undefined || endPage === undefined) {
        return next()
    }
    const dataList = await getDataList(parseInt(startPage), parseInt(endPage))
    res.send(dataList)
})

app.use(bugRaise)

// need to add task name here 
function logging(req: Request, res: Response, next: NextFunction) {
    console.log('Start task with task name')
    next()
}

function bugRaise(req: Request, res: Response, next: NextFunction) {
    res.send('The required fields are not specified, please retry with sepcified fields')
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})