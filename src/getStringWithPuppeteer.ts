import puppeteer, { Browser } from 'puppeteer';

import { StringResponse } from './types';

const getStringWithPuppeteer = async (url: string): Promise<StringResponse> => {
  let browser: Browser | undefined = undefined;

  try {
    console.time(`launching - ${url}`);
    browser = await puppeteer.launch();
    console.timeEnd(`launching - ${url}`);

    console.time(`opening - ${url}`);
    const page = await browser.newPage();
    console.timeEnd(`opening - ${url}`);

    console.time(`goto - ${url}`);
    await page.goto(url);
    console.timeEnd(`goto - ${url}`);

    console.time(`waitForSelector head - ${url}`);
    await page.waitForSelector('head');
    console.timeEnd(`waitForSelector head - ${url}`);

    console.time(`waitForSelector body - ${url}`);
    await page.waitForSelector('body');
    console.timeEnd(`waitForSelector body - ${url}`);

    console.time(`waitForNetworkIdle - ${url}`);
    await page.waitForNetworkIdle();
    console.timeEnd(`waitForNetworkIdle - ${url}`);

    console.time(`content - ${url}`);
    const html = await page.content();
    console.timeEnd(`content - ${url}`);

    console.log({ html, url: page.url() });

    return {
      data: html,
      url: page.url(),
    };
  } finally {
    if (browser) {
      console.time(`close - ${url}`);
      await browser.close();
      console.timeEnd(`close - ${url}`);
    }
  }
};

export default getStringWithPuppeteer;
