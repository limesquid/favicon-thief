import fetch from 'node-fetch';

import { DEFAULT_USER_AGENT } from '../constants';
import { Options, Candidate } from '../types';

import extractCandidates from './extractCandidates';
import getDefaultFaviconUrl from './getDefaultFaviconUrl';
import sortCandidates from './sortCandidates';
import unique from './unique';

/**
 * Retrieves URLs under which favicons may be found for a given URL.
 * It never throws.
 */
const getCandidateUrls = async (url: string, options: Options): Promise<Candidate['url'][]> => {
  try {
    const { init } = options;
    const response = await fetch(url, {
      ...init,
      headers: {
        'User-Agent': DEFAULT_USER_AGENT,
        ...(init ? init.headers : {}),
      },
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const candidates = extractCandidates(html, url);
    const candidateUrls = [
      ...sortCandidates(candidates).map(({ url }) => url),
      getDefaultFaviconUrl(url),
    ];

    return unique(candidateUrls);
  } catch {
    return [];
  }
};

export default getCandidateUrls;
