import * as GenericPool from 'generic-pool';
import { Browser, LaunchOptions, Page } from 'puppeteer';
import IOptions from '../interfaces/IOptions';
export default class PuppeteerService {
    browser: Browser | null;
    options: IOptions;
    pagePool: any;
    defaultBrowserOptions: IOptions;
    poolOptions: GenericPool.Options;
    constructor(options?: IOptions);
    factory: {
        create: () => Promise<Page | null>;
        destroy: (page: any) => Promise<any>;
    };
    setPoolOptions(options: IOptions): void;
    newPage(): Promise<Page | null>;
    closePage(page: Page): Promise<any>;
    getBrowser(): Promise<Browser | null>;
    newBrowser(): Promise<Browser>;
    getBrowserOptions(): LaunchOptions;
    getProxyConfiguration(): string | null;
    hasProxy(): boolean;
    isBrowserRunning(): Promise<boolean>;
    closeBrowser(): Promise<void>;
}
