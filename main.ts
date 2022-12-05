import startBrowser from './browser'
import { bdsCrawler } from './crawler'
import { getDataList } from './tasks'
import express, { NextFunction, Request, Response } from 'express'



const app = express()
const port = 3000

app.use(logging)

app.get('/getPage', checkInputParams, async (req, res, next) => {
    const startPage = req.query.startpage as string
    const endPage = req.query.endpage as string
    if (startPage === undefined ) {
        // @ts-ignore
        req.missingVar = 'startpage'
        return next()
    }
     else if (endPage === undefined) {
        // @ts-ignore
        req.missingVar = 'endpage'
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
    // @ts-ignore
    res.send(`There is no ${req.missingVar} defined`)
}

function checkInputParams(req: Request, res: Response, next: NextFunction) {
    if (Object.keys(req.query).length == 0) {
        lackParams(res)
    }
    else {
        return next()
    }
}

function lackParams(res: Response) {
    res.send('You do not specify any parameter')
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})