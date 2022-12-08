import probeImageSize from 'probe-image-size';

import { DEFAULT_USER_AGENT } from './constants';
import { getCandidateUrls, getHtmlCandidateUrls, sortIcons } from './lib';
import { FindIconsOptions, Icon } from './types';

/**
 * Finds all icons that represent given URL.
 * Results are sorted - best first.
 * Favors vector images, square images, and large images (in that order).
 * It never throws.
 */
const findIcons = async (url: string, options: FindIconsOptions = {}): Promise<Icon[]> => {
  const { init } = options;
  const htmlCandidateUrlsStack = getHtmlCandidateUrls(url).reverse();
  const icons: Icon[] = [];
  const headers = {
    'User-Agent': DEFAULT_USER_AGENT,
    ...init?.headers,
  };
  let htmlCandidateUrl: string | undefined;

  while ((htmlCandidateUrl = htmlCandidateUrlsStack.pop())) {
    try {
      const candidateUrls = await getCandidateUrls(htmlCandidateUrl, { ...init, headers });

      for (const candidateUrl of candidateUrls) {
        try {
          const icon = await probeImageSize(candidateUrl);
          icons.push(icon);
        } catch {
          // skip this candidateUrl
        }
      }

      // do not try another htmlCandidateUrl website if some icon has been found
      if (icons.length > 0) {
        return sortIcons(icons);
      }
    } catch {
      // skip this htmlCandidateUrl
    }
  }

  return [];
};

export default findIcons;
