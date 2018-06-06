"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const GenericPool = require("generic-pool");
const puppeteer_1 = require("puppeteer");
class PuppeteerService {
    constructor(options = {}) {
        this.defaultBrowserOptions = {
            headless: true,
            limit: 2
        };
        this.poolOptions = {
            acquireTimeoutMillis: 3000,
            autostart: true,
            evictionRunIntervalMillis: 1000,
            fifo: true,
            idleTimeoutMillis: 30000,
            max: 2,
            maxWaitingClients: 1,
            min: 0,
            priorityRange: 1,
            testOnBorrow: false,
            softIdleTimeoutMillis: -1,
        };
        this.factory = {
            create: () => __awaiter(this, void 0, void 0, function* () {
                return this.newPage();
            }),
            destroy: (page) => __awaiter(this, void 0, void 0, function* () {
                this.closePage(page);
            })
        };
        this.browser = null;
        this.options = Object.assign({}, this.defaultBrowserOptions, options);
        this.setPoolOptions(options);
        this.pagePool = GenericPool.createPool(this.factory, this.poolOptions);
    }
    setPoolOptions(options) {
        if (this.options.limit) {
            this.poolOptions.max = this.options.limit;
        }
    }
    newPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getBrowser();
            if (!this.browser) {
                return null;
            }
            return this.browser.newPage();
        });
    }
    closePage(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.browser) {
                return false;
            }
            return page.close();
        });
    }
    getBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            const isBrowserRunning = yield this.isBrowserRunning();
            if (!isBrowserRunning) {
                return this.newBrowser();
            }
            else {
                return this.browser;
            }
        });
    }
    newBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            const browserOptions = this.getBrowserOptions();
            this.browser = yield puppeteer_1.launch(browserOptions);
            return this.browser;
        });
    }
    getBrowserOptions() {
        const options = {
            args: [
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--ignore-certificate-errors',
                '--incognito',
                '--no-sandbox',
                '--window-size=1920,1080',
            ],
            headless: false
        };
        if (this.options.headless === true) {
            options.headless = true;
            options.args.push('--headless');
        }
        const proxyConfiguration = this.getProxyConfiguration();
        if (proxyConfiguration) {
            options.args.push(proxyConfiguration);
        }
        return options;
    }
    getProxyConfiguration() {
        if (this.options.proxy) {
            return `--proxy-server=${this.options.proxy.host}:${this.options.proxy.port}`;
        }
        else {
            return null;
        }
    }
    hasProxy() {
        return (this.options.proxy) ? true : false;
    }
    isBrowserRunning() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.browser) {
                return false;
            }
            try {
                const page = yield this.browser.newPage();
                const isBrowserRunning = yield page.evaluate('navigator.userAgent');
                yield page.close();
                return (isBrowserRunning) ? true : false;
            }
            catch (error) {
                return false;
            }
        });
    }
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.browser) {
                return this.browser.close();
            }
        });
    }
}
exports.default = PuppeteerService;
