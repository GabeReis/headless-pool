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

import { HeadlessPoolPuppeteer } from '../index';

describe('Puppeteer - Browser manipulation', () => {


  test('Get browser instance - New instance', async () => {
    jest.setTimeout(10000);
    const headlessPool = new HeadlessPoolPuppeteer({
      max: 2
    });

    const page1 = await headlessPool.pagePool.acquire();
    if(page1) {
      await page1.goto('http://www.google.com');
    }

    const page2 = await headlessPool.pagePool.acquire();
    if(page2) {
      await page2.goto('http://www.g1.com');
    }

    try {
      // await headlessPool.pagePool.destroy(page2);
      const page3 = await headlessPool.pagePool.acquire();
    } catch (error) {
      console.log('=========');
      
      expect(error).toBe(error);
    }
  });



  



  // test('Get browser instance - New instance', async () => {
  //   const headlessPool = new HeadlessPoolPuppeteer();
  //   await headlessPool.getBrowser();
  //   const isBrowserRunning = await headlessPool.isBrowserRunning();
	// 	expect(isBrowserRunning).toEqual(true);
  // });

  // test('Get browser instance - Existing instance', async () => {
  //   const headlessPool = new HeadlessPoolPuppeteer();
  //   await headlessPool.newBrowser();
  //   await headlessPool.getBrowser();
  //   const isBrowserRunning = await headlessPool.isBrowserRunning();
	// 	expect(isBrowserRunning).toEqual(true);
  // });

  // test('Get browser instance - New instance after closed instance', async () => {
  //   const headlessPool = new HeadlessPoolPuppeteer();
  //   await headlessPool.newBrowser();
  //   await headlessPool.closeBrowser();
  //   await headlessPool.getBrowser();
  //   const isBrowserRunning = await headlessPool.isBrowserRunning();
	// 	expect(isBrowserRunning).toEqual(true);
  // });

  // test('Has proxy - True', async () => {
  //   const options = {
  //     proxy: {
  //       host: '127.0.0.1',
  //       port: 8080
  //     }
  //   }
  //   const headlessPool = new HeadlessPoolPuppeteer(options);
  //   const hasProxy = headlessPool.hasProxy();
	// 	expect(hasProxy).toEqual(true);
  // });

  // test('Has proxy - False', async () => {
  //   const headlessPool = new HeadlessPoolPuppeteer();
  //   const hasProxy = headlessPool.hasProxy();
	// 	expect(hasProxy).toEqual(false);
  // });

  // test('Check browser configs - No proxy', async () => {
	// 	const defaultOptions = {
  //     args: [
	// 			'--disable-gpu',
	// 			'--disable-setuid-sandbox',
  //       '--disable-web-security',
	// 			// '--headless',
	// 			'--ignore-certificate-errors',
  //       '--incognito',
  //       '--no-sandbox',
  //       '--window-size=1920,1080'
  //     ]
  //   }
  //   const headlessPool = new HeadlessPoolPuppeteer();
  //   const loadOptions = await headlessPool.getBrowserOptions();
  //   expect(loadOptions).toEqual(defaultOptions);
	// });

  // test('Check browser configs - Has proxy', async () => {
	// 	const defaultOptions = {
  //     args: [
	// 			'--disable-gpu',
	// 			'--disable-setuid-sandbox',
  //       '--disable-web-security',
	// 			// '--headless',
	// 			'--ignore-certificate-errors',
  //       '--incognito',
  //       '--no-sandbox',
  //       '--window-size=1920,1080',
  //       '--proxy-server=127.0.0.1:8080'
  //     ]
  //   }
  //   const options = {
  //     proxy: {
  //       host: '127.0.0.1',
  //       port: 8080
  //     }
  //   }
  //   const headlessPool = new HeadlessPoolPuppeteer(options);
  //   const loadOptions = await headlessPool.getBrowserOptions();
  //   expect(loadOptions).toEqual(defaultOptions);
	// });

	// test('Check if browser is running - Browser closed', async () => {
  //   const headlessPool = new HeadlessPoolPuppeteer();
  //   await headlessPool.newBrowser();
  //   await headlessPool.closeBrowser();
  //   const isBrowserRunning = await headlessPool.isBrowserRunning();
  //   await headlessPool.closeBrowser();
	// 	expect(isBrowserRunning).toEqual(false);
  // });
  
  // test('Check if browser is running - Browser opened', async () => {
  //   const headlessPool = new HeadlessPoolPuppeteer();
  //   await headlessPool.newBrowser();
  //   const isBrowserRunning = await headlessPool.isBrowserRunning();
  //   await headlessPool.closeBrowser();
	// 	expect(isBrowserRunning).toEqual(true);
  // });
  
  // test('Close browser - Browser not opened', async () => {
  //   const headlessPool = new HeadlessPoolPuppeteer();
  //   const closeInexistentBrowser = await headlessPool.closeBrowser();
	// 	expect(closeInexistentBrowser).toBeUndefined();
  // });
});
