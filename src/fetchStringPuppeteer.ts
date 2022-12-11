import puppeteer, { Browser } from 'puppeteer';

import { StringResponse } from './types';

// prevent to redirect to the mobile version of a website
const DEFAULT_USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36';

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
