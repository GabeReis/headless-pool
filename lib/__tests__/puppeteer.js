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
const index_1 = require("../index");
describe('Puppeteer - Browser manipulation', () => {
    test('Get browser instance - New instance', () => __awaiter(this, void 0, void 0, function* () {
        jest.setTimeout(10000);
        const headlessPool = new index_1.HeadlessPoolPuppeteer({
            limit: 2
        });
        const page1 = yield headlessPool.pagePool.acquire();
        if (page1) {
            yield page1.goto('http://www.google.com');
        }
        const page2 = yield headlessPool.pagePool.acquire();
        if (page2) {
            yield page2.goto('http://www.google.com');
        }
        try {
            const page3 = yield headlessPool.pagePool.acquire();
        }
        catch (error) {
            expect(error).toBe(error);
        }
    }));
    test('Get browser instance - New instance', () => __awaiter(this, void 0, void 0, function* () {
        const headlessPool = new index_1.HeadlessPoolPuppeteer();
        yield headlessPool.getBrowser();
        const isBrowserRunning = yield headlessPool.isBrowserRunning();
        expect(isBrowserRunning).toEqual(true);
    }));
    test('Get browser instance - Existing instance', () => __awaiter(this, void 0, void 0, function* () {
        const headlessPool = new index_1.HeadlessPoolPuppeteer();
        yield headlessPool.newBrowser();
        yield headlessPool.getBrowser();
        const isBrowserRunning = yield headlessPool.isBrowserRunning();
        expect(isBrowserRunning).toEqual(true);
    }));
    test('Get browser instance - New instance after closed instance', () => __awaiter(this, void 0, void 0, function* () {
        const headlessPool = new index_1.HeadlessPoolPuppeteer();
        yield headlessPool.newBrowser();
        yield headlessPool.closeBrowser();
        yield headlessPool.getBrowser();
        const isBrowserRunning = yield headlessPool.isBrowserRunning();
        expect(isBrowserRunning).toEqual(true);
    }));
    test('Has proxy - True', () => __awaiter(this, void 0, void 0, function* () {
        const options = {
            proxy: {
                host: '127.0.0.1',
                port: 8080
            }
        };
        const headlessPool = new index_1.HeadlessPoolPuppeteer(options);
        const hasProxy = headlessPool.hasProxy();
        expect(hasProxy).toEqual(true);
    }));
    test('Has proxy - False', () => __awaiter(this, void 0, void 0, function* () {
        const headlessPool = new index_1.HeadlessPoolPuppeteer();
        const hasProxy = headlessPool.hasProxy();
        expect(hasProxy).toEqual(false);
    }));
    test('Check browser configs - No proxy', () => __awaiter(this, void 0, void 0, function* () {
        const defaultOptions = {
            args: [
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--ignore-certificate-errors',
                '--incognito',
                '--no-sandbox',
                '--window-size=1920,1080',
                '--headless'
            ],
            'headless': true
        };
        const headlessPool = new index_1.HeadlessPoolPuppeteer();
        const loadOptions = yield headlessPool.getBrowserOptions();
        expect(loadOptions).toEqual(defaultOptions);
    }));
    test('Check browser configs - Has proxy', () => __awaiter(this, void 0, void 0, function* () {
        const defaultOptions = {
            args: [
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--ignore-certificate-errors',
                '--incognito',
                '--no-sandbox',
                '--window-size=1920,1080',
                '--headless',
                '--proxy-server=127.0.0.1:8080'
            ],
            'headless': true
        };
        const options = {
            proxy: {
                host: '127.0.0.1',
                port: 8080
            }
        };
        const headlessPool = new index_1.HeadlessPoolPuppeteer(options);
        const loadOptions = yield headlessPool.getBrowserOptions();
        expect(loadOptions).toEqual(defaultOptions);
    }));
    test('Check if browser is running - Browser closed', () => __awaiter(this, void 0, void 0, function* () {
        const headlessPool = new index_1.HeadlessPoolPuppeteer();
        yield headlessPool.newBrowser();
        yield headlessPool.closeBrowser();
        const isBrowserRunning = yield headlessPool.isBrowserRunning();
        yield headlessPool.closeBrowser();
        expect(isBrowserRunning).toEqual(false);
    }));
    test('Check if browser is running - Browser opened', () => __awaiter(this, void 0, void 0, function* () {
        const headlessPool = new index_1.HeadlessPoolPuppeteer();
        yield headlessPool.newBrowser();
        const isBrowserRunning = yield headlessPool.isBrowserRunning();
        yield headlessPool.closeBrowser();
        expect(isBrowserRunning).toEqual(true);
    }));
    test('Close browser - Browser not opened', () => __awaiter(this, void 0, void 0, function* () {
        const headlessPool = new index_1.HeadlessPoolPuppeteer();
        const closeInexistentBrowser = yield headlessPool.closeBrowser();
        expect(closeInexistentBrowser).toBeUndefined();
    }));
});
