import { load } from 'cheerio';

import {
  createGuessed,
  extractHttpEquivRefreshUrl,
  getFavicons,
  getHtmlCandidateUrls,
  guessFaviconUrl,
} from './lib';
import { Favicon, FetchString } from './types';

const MAX_HTTP_EQUIV_REDIRECTS = 3;

/**
 * Finds all favicons that represent given URL.
 * Pass your own fetching function.
 * Results are sorted - best first.
 * Favors vector images, square images, and large images (in that order).
 * It never throws.
 */
const findFavicons = async (
  url: string,
  fetch: FetchString,
  maxRedirects = MAX_HTTP_EQUIV_REDIRECTS,
): Promise<Favicon[]> => {
  const htmlCandidateUrls = getHtmlCandidateUrls(url);
  const htmlCandidateUrlsStack = [...htmlCandidateUrls].reverse();
  const guessedUrls: string[] = [];
  let htmlCandidateUrl: string | undefined;

  while ((htmlCandidateUrl = htmlCandidateUrlsStack.pop())) {
    let html = '';
    let url = '';

    try {
      const response = await fetch(htmlCandidateUrl);
      html = response.data;
      url = response.url;
      guessedUrls.push(guessFaviconUrl(url), guessFaviconUrl(htmlCandidateUrl));
    } catch (error) {
      if (process.env.NODE_ENV === 'test') {
        console.error({ url: htmlCandidateUrl, error });
      }

      guessedUrls.push(guessFaviconUrl(htmlCandidateUrl));
      continue;
    }

    try {
      const $ = load(html);
      const httpEquivRefreshUrl = extractHttpEquivRefreshUrl($);

      if (typeof httpEquivRefreshUrl === 'string' && maxRedirects > 0) {
        const faviconLinks = await findFavicons(httpEquivRefreshUrl, fetch, maxRedirects - 1);
        const sureFavicons = faviconLinks.filter(({ source }) => source !== 'guess');

        guessedUrls.push(...faviconLinks.map((link) => link.url));

        // do not try another htmlCandidateUrl if an icon has been found
        if (sureFavicons.length > 0) {
          return [...sureFavicons, ...createGuessed(guessedUrls)];
        }
      } else {
        const faviconLinks = getFavicons($, url);

        // do not try another htmlCandidateUrl if an icon has been found
        if (faviconLinks.length > 0) {
          return [...faviconLinks, ...createGuessed(guessedUrls)];
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'test') {
        console.error({ url: htmlCandidateUrl, error });
      }
    }
  }

  return createGuessed(guessedUrls);
};

export default findFavicons;
