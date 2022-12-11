import puppeteer, { Browser } from 'puppeteer';

import { DEFAULT_USER_AGENT } from '../constants';
import { StringResponse } from '../types';

const fetchStringPuppeteer = async (
  url: string,
  userAgent = DEFAULT_USER_AGENT,
): Promise<StringResponse> => {
  let browser: Browser | undefined = undefined;

  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const html = await page.content();

    return {
      data: html,
      url: page.url(),
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default fetchStringPuppeteer;
