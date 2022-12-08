import { load } from 'cheerio';
import fetch, { RequestInit } from 'node-fetch-cjs';

import { Candidate } from '../types';

import extractCandidates from './extractCandidates';
import extractHttpEquivRefreshUrl from './extractHttpEquivRefreshUrl';
import getDefaultFaviconUrl from './getDefaultFaviconUrl';
import sortCandidates from './sortCandidates';
import unique from './unique';

/**
 * Retrieves URLs under which favicons may be found for a given URL.
 * It never throws.
 */
const getCandidateUrls = async (url: string, init?: RequestInit): Promise<Candidate['url'][]> => {
  try {
    const response = await fetch(url, init);
    const defaultFaviconUrls = unique([
      getDefaultFaviconUrl(response.url),
      getDefaultFaviconUrl(url),
    ]);

    if (!response.ok) {
      if (process.env.NODE_ENV === 'test') {
        const error = `Failed to fetch ${url}: ${response.status} ${response.statusText}`;

        try {
          const message = await response.text();
          const finalError = [error, message].join('\n');
          console.error(finalError);
        } catch {
          // response is not a text
          console.error(error);
        }
      }

      return defaultFaviconUrls;
    }

    const html = await response.text();
    const $ = load(html);
    const httpEquivRefreshUrl = extractHttpEquivRefreshUrl($);

    if (typeof httpEquivRefreshUrl === 'string') {
      return getCandidateUrls(httpEquivRefreshUrl, init);
    }

    const candidates = extractCandidates($, response.url);
    const candidateUrls = unique([
      ...sortCandidates(candidates).map(({ url }) => url),
      ...defaultFaviconUrls,
    ]);

    return candidateUrls;
  } catch (error) {
    if (process.env.NODE_ENV === 'test') {
      console.error(error);
    }

    return [];
  }
};

export default getCandidateUrls;
