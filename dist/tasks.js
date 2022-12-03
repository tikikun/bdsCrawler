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
exports.getDataList = void 0;
const browser_1 = __importDefault(require("./browser"));
const crawler_1 = require("./crawler");
function getDataList() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield new crawler_1.bdsCrawler(yield (0, browser_1.default)(), 'https://batdongsan.com.vn/ban-can-ho-chung-cu-can-ho-hoang-quoc-viet', 1, 10).getMultiPage();
        return data;
    });
}
exports.getDataList = getDataList;
