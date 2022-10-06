import probeImageSize from 'probe-image-size';

import { getCandidateUrls, getHtmlCandidateUrls, sortIcons } from './lib';
import { Options, Icon } from './types';

/**
 * Tries to find all icons that represent given URL.
 * Icons are sorted descending (best first).
 * Favors vector images, square images, and then large images.
 * It never throws.
 */
const findIcons = async (url: string, options: Options = {}): Promise<Icon[]> => {
  const htmlCandidateUrls = getHtmlCandidateUrls(url);
  const htmlCandidateUrlsStack = [...htmlCandidateUrls].reverse();
  const icons: Icon[] = [];
  let htmlCandidateUrl: string | undefined;

  while ((htmlCandidateUrl = htmlCandidateUrlsStack.pop())) {
    try {
      const candidateUrls = await getCandidateUrls(htmlCandidateUrl, options);

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
