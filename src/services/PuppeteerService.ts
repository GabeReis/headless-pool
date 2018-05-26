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

const Debug = require('debug');
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

	constructor(options: IOptions = {}) {
		this.browser = null;
		this.options = options;
	}

	getBrowser = async (): Promise<Browser | null> => {
		const isBrowserRunning = await this.isBrowserRunning();
		if (!isBrowserRunning) {
			return this.newBrowser();
		} else {
			return this.browser;
		}
	}

	newBrowser = async (): Promise<Browser> => {
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
				'--headless',
				'--ignore-certificate-errors',
        '--incognito',
        '--no-sandbox',
        '--window-size=1920,1080',
      ]
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
