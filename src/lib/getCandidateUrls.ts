import fetch, { RequestInit } from 'node-fetch';

import { Candidate } from '../types';

import extractCandidates from './extractCandidates';
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
      getDefaultFaviconUrl(url),
      getDefaultFaviconUrl(response.url),
    ]);

    if (!response.ok) {
      return defaultFaviconUrls;
    }

    const html = await response.text();
    const candidates = extractCandidates(html, url);
    const candidateUrls = unique([
      ...sortCandidates(candidates).map(({ url }) => url),
      ...defaultFaviconUrls,
    ]);

    return candidateUrls;
  } catch {
    return [];
  }
};

export default getCandidateUrls;
