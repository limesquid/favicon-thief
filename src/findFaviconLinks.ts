import { load } from 'cheerio';

import {
  createGuessedLinks,
  extractHttpEquivRefreshUrl,
  getFaviconLinks,
  getHtmlCandidateUrls,
  guessFaviconUrl,
} from './lib';
import { FaviconLink, FetchString } from './types';

const MAX_HTTP_EQUIV_REDIRECTS = 3;

/**
 * Finds all icons that represent given URL.
 * Results are sorted - best first.
 * Favors vector images, square images, and large images (in that order).
 * It never throws.
 */
const findFaviconLinks = async (
  url: string,
  fetch: FetchString,
  maxRedirects = MAX_HTTP_EQUIV_REDIRECTS,
): Promise<FaviconLink[]> => {
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
        console.error(error);
      }

      guessedUrls.push(guessFaviconUrl(htmlCandidateUrl));
      continue;
    }

    try {
      const $ = load(html);
      const httpEquivRefreshUrl = extractHttpEquivRefreshUrl($);

      if (typeof httpEquivRefreshUrl === 'string' && maxRedirects > 0) {
        const faviconLinks = await findFaviconLinks(httpEquivRefreshUrl, fetch, maxRedirects - 1);
        const sureFaviconLinks = faviconLinks.filter(({ source }) => source !== 'guess');

        guessedUrls.push(...faviconLinks.map((link) => link.url));

        // do not try another htmlCandidateUrl if an icon has been found
        if (sureFaviconLinks.length > 0) {
          return [...sureFaviconLinks, ...createGuessedLinks(guessedUrls)];
        }
      } else {
        const faviconLinks = getFaviconLinks($, url);

        // do not try another htmlCandidateUrl if an icon has been found
        if (faviconLinks.length > 0) {
          return [...faviconLinks, ...createGuessedLinks(guessedUrls)];
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'test') {
        console.error(error);
      }
    }
  }

  return createGuessedLinks(guessedUrls);
};

export default findFaviconLinks;
