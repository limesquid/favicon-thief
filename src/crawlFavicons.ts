import { RequestInit } from 'node-fetch-cjs';

import crawlWithFetch from './crawlWithFetch';
import crawlWithPuppeteer from './crawlWithPuppeteer';
import findFavicons from './findFavicons';
import { Favicon } from './types';

const crawlFavicons = async (url: string, init?: RequestInit): Promise<Favicon[]> => {
  try {
    const faviconLinks = await findFavicons(url, (url) => crawlWithFetch(url, init));

    if (faviconLinks.some(({ source }) => source !== 'guess')) {
      return faviconLinks;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'test') {
      console.error({ url, error });
    }
  }

  return findFavicons(url, (url) => {
    const headers: Record<string, string> = { ...init?.headers };
    const userAgent = headers['User-Agent'];
    return crawlWithPuppeteer(url, userAgent);
  });
};

export default crawlFavicons;
