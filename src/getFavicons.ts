import findFavicons from './findFavicons';
import { fetchStringNode, fetchStringPuppeteer } from './lib';
import { Favicon } from './types';

/**
 * Uses findFavicons to get all favicons that represent given URL.
 * Uses node-fetch & puppeteer to crawl webpages.
 * Results are sorted - best first.
 * Favors vector images, square images, and large images (in that order).
 */
const getFavicons = async (url: string, headers?: Record<string, string>): Promise<Favicon[]> => {
  try {
    const faviconLinks = await findFavicons(url, (url) => fetchStringNode(url, headers));

    if (faviconLinks.some(({ source }) => source !== 'guess')) {
      return faviconLinks;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'test') {
      console.error({ url, error });
    }
  }

  return findFavicons(url, (url) => {
    const userAgent = headers ? headers['User-Agent'] : undefined;
    return fetchStringPuppeteer(url, userAgent);
  });
};

export default getFavicons;
