/*
 * Copyright (c) 2018 Gabriel Reis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

import * as GenericPool from 'generic-pool';
import { 
	Browser,
	launch,
	LaunchOptions,
	Page
} from 'puppeteer';
import IOptions from '../interfaces/IOptions';
import IProxy from '../interfaces/IProxy';

export default class PuppeteerService {

	public browser: Browser | null;
	public options: IOptions;
	public pagePool: any;

	defaultBrowserOptions: IOptions = {
		headless: true,
		max: 2
	}

	poolOptions: GenericPool.Options = {
		acquireTimeoutMillis: 3000, // max milsec to wait before timing out
		autostart: true, // start creating resources automatically
		evictionRunIntervalMillis: 1000, // interval between eviction checks
		fifo: true, // first in first out
		idleTimeoutMillis: 30000, // amount of time an object may sit idle in the pool
		max: 2, // maximum size of the pool
		maxWaitingClients: 1, // maximum number of queued requests allowed
		min: 0, // minimum size of the pool
		priorityRange: 1, // set priority in the queue
		testOnBorrow: false, // validate resources before returning them
		softIdleTimeoutMillis: -1, // amount of time an object may sit idle in the pool
	};

	constructor(options: IOptions = {}) {
		this.browser = null;
		this.options = {
			...this.defaultBrowserOptions,
			...options
		};

		if (this.options.max) {
			this.poolOptions.max = this.options.max;
		}		

		this.pagePool = GenericPool.createPool(this.factory, this.poolOptions);
	}

	factory = {
		create: async (): Promise<Page | null> => {
			return this.newPage();
		},
		destroy: async (page: any): Promise<any> => {
			this.closePage(page);
		}
	};

	
	
	async newPage(): Promise<Page | null>  {
		await this.getBrowser();
		if (!this.browser) {
			return null;
		}
		return this.browser.newPage();
	}

	async closePage(page: Page): Promise<any> {
		if (!this.browser) {
			return false;
		}
		return page.close();
	}

	async getBrowser(): Promise<Browser | null> {
		const isBrowserRunning = await this.isBrowserRunning();
		if (!isBrowserRunning) {
			return this.newBrowser();
		} else {
			return this.browser;
		}
	}

	async newBrowser(): Promise<Browser> {
		const browserOptions = this.getBrowserOptions();
		this.browser = await launch(browserOptions);
		return this.browser;
	}

  getBrowserOptions(): LaunchOptions {
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
		}

		// If headless set to true
		if (this.options.headless === true) {
			options.headless = true;
			options.args.push('--headless');
		}

		// Set proxy if defined		
		const proxyConfiguration = this.getProxyConfiguration();
		if (proxyConfiguration) {
			options.args.push(proxyConfiguration);
		}

    return options;
	}

	getProxyConfiguration() {
		if (this.options.proxy) {
			return `--proxy-server=${this.options.proxy.host}:${this.options.proxy.port}`;
		} else {
			return null;
		}
	}

	hasProxy(): boolean {
		return (this.options.proxy) ? true : false;
	}
	
	async isBrowserRunning(): Promise<boolean> {
		if (!this.browser) {
			return false;
		}
		try {
			const page: Page = await this.browser.newPage();
			const isBrowserRunning = await page.evaluate('navigator.userAgent');
			await page.close();
			return (isBrowserRunning) ? true : false;
		} catch (error) {
			return false;
		}
	}

	async closeBrowser(): Promise<void> {
		if (this.browser) {
			return this.browser.close();
		}
	}
}
