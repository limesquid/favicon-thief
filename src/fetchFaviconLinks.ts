import { RequestInit } from 'node-fetch-cjs';

import findFaviconLinks from './findFaviconLinks';
import fetchStringWithNodeFetch from './fetchStringWithNodeFetch';
import fetchStringWithPuppeteer from './fetchStringWithPuppeteer';
import { FaviconLink } from './types';

const fetchFaviconLinks = async (url: string, init?: RequestInit): Promise<FaviconLink[]> => {
  try {
    const faviconLinks = await findFaviconLinks(url, (url) => fetchStringWithNodeFetch(url, init));

    if (faviconLinks.some(({ source }) => source !== 'guess')) {
      return faviconLinks;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'test') {
      console.error({ url, error });
    }
  }

  return findFaviconLinks(url, (url) => {
    const headers: Record<string, string> = { ...init?.headers };
    const userAgent = headers['User-Agent'];
    return fetchStringWithPuppeteer(url, userAgent);
  });
};

export default fetchFaviconLinks;
