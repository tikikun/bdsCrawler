"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("./tasks");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(logging);
app.get('/getPage', checkInputParams, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const startPage = req.query.startpage;
    const endPage = req.query.endpage;
    if (startPage === undefined) {
        // @ts-ignore
        req.missingVar = 'startpage';
        return next();
    }
    else if (endPage === undefined) {
        // @ts-ignore
        req.missingVar = 'endpage';
        return next();
    }
    const dataList = yield (0, tasks_1.getDataList)(parseInt(startPage), parseInt(endPage));
    res.send(dataList);
}));
app.use(bugRaise);
// need to add task name here 
function logging(req, res, next) {
    console.log('Start task with task name');
    next();
}
function bugRaise(req, res, next) {
    // @ts-ignore
    res.send(`There is no ${req.missingVar} defined`);
}
function checkInputParams(req, res, next) {
    if (Object.keys(req.query).length == 0) {
        lackParams(res);
    }
    else {
        return next();
    }
}
function lackParams(res) {
    res.send('You do not specify any parameter');
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
