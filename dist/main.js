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
app.get('/getPage', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const startPage = req.query.startpage;
    const endPage = req.query.endpage;
    if (startPage === undefined || endPage === undefined) {
        return next();
    }
    const dataList = yield (0, tasks_1.getDataList)(parseInt(startPage), parseInt(endPage));
    res.send(dataList);
}));
app.use(bugRaise);
function logging(req, res, next) {
    console.log('Thunghiemn');
    next();
}
function bugRaise(req, res, next) {
    res.send('The required fields are not specified, please retry with sepcified fields');
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
