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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _bdsCrawler_instances, _bdsCrawler_getItemArray, _bdsCrawler_handleListPage, _bdsCrawler_makeCrawlArray;
Object.defineProperty(exports, "__esModule", { value: true });
const browser_1 = __importDefault(require("./browser"));
class bdsCrawler {
    constructor(pupBrowser, pageUrl, startPage, endPage) {
        _bdsCrawler_instances.add(this);
        this.pupBrowser = pupBrowser;
        this.pageUrl = pageUrl;
        this.startPage = startPage;
        this.endPage = endPage;
    }
    getMultiPage() {
        return __awaiter(this, void 0, void 0, function* () {
            var result = [];
            const listPage = __classPrivateFieldGet(this, _bdsCrawler_instances, "m", _bdsCrawler_makeCrawlArray).call(this);
            yield Promise.all(listPage.map((page) => __awaiter(this, void 0, void 0, function* () {
                const itemlist = yield __classPrivateFieldGet(this, _bdsCrawler_instances, "m", _bdsCrawler_getItemArray).call(this, page);
                console.log(`Done fetching for page: ${page}`);
                result = result.concat(itemlist);
            })));
            console.log('Done fetching all return data');
            return result;
        });
    }
}
_bdsCrawler_instances = new WeakSet(), _bdsCrawler_getItemArray = function _bdsCrawler_getItemArray(pageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemList = yield __classPrivateFieldGet(this, _bdsCrawler_instances, "m", _bdsCrawler_handleListPage).call(this, pageUrl);
        const resultArray = itemList.map((el) => __awaiter(this, void 0, void 0, function* () {
            const item = yield el.$eval('a', a => {
                var _a, _b, _c;
                const payload = {
                    title: a.getAttribute('title'),
                    price: ((_a = a.querySelector('.re__card-config-price')) === null || _a === void 0 ? void 0 : _a.textContent) || null,
                    area: ((_b = a.querySelector('.re__card-config-area')) === null || _b === void 0 ? void 0 : _b.textContent) || null,
                    publishedAt: ((_c = a.querySelector('.re__card-published-info-published-at')) === null || _c === void 0 ? void 0 : _c.getAttribute('aria-label')) || null,
                    url: window.location.href
                };
                return payload;
            });
            return item;
        }));
        const result = Promise.all(resultArray);
        return result;
    });
}, _bdsCrawler_handleListPage = function _bdsCrawler_handleListPage(pageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield this.pupBrowser.newPage();
        yield page.goto(pageUrl);
        yield page.waitForSelector('span.re__card-config-price_per_m2');
        //await new Promise(r => setTimeout(r, 2000))
        const itemList = yield page.$$('#product-lists-web > div');
        return itemList;
    });
}, _bdsCrawler_makeCrawlArray = function _bdsCrawler_makeCrawlArray() {
    const result = [];
    for (let index = this.startPage; index < this.endPage; index++) {
        result.push(this.pageUrl + `p${index}?sortValue=1`);
    }
    return result;
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new bdsCrawler(yield (0, browser_1.default)(), 'https://batdongsan.com.vn/ban-can-ho-chung-cu-can-ho-hoang-quoc-viet', 1, 10).getMultiPage();
    console.log(data);
}))();
