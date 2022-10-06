import probeImageSize from 'probe-image-size';

import { DEFAULT_MIN_SIZE, DEFAULT_USER_AGENT } from './constants';
import {
  defaultHeaders,
  getCandidateUrls,
  getHtmlCandidateUrls,
  isGoodIcon,
  sortIcons,
} from './lib';
import { FindIconOptions, Icon } from './types';

/**
 * Finds an icon that represents given URL best.
 * Favors vector images, square images, and large images (in that order).
 * It never throws.
 */
const findIcon = async (url: string, options: FindIconOptions = {}): Promise<Icon | null> => {
  const { init, minSize = DEFAULT_MIN_SIZE } = options;
  const htmlCandidateUrlsStack = getHtmlCandidateUrls(url).reverse();
  const icons: Icon[] = [];
  let htmlCandidateUrl: string | undefined;

  while ((htmlCandidateUrl = htmlCandidateUrlsStack.pop())) {
    try {
      const candidateUrls = await getCandidateUrls(
        htmlCandidateUrl,
        defaultHeaders(init, { 'User-Agent': DEFAULT_USER_AGENT }),
      );

      for (const candidateUrl of candidateUrls) {
        try {
          const icon = await probeImageSize(candidateUrl);

          // bail out early if good-enough icon already has been found
          if (isGoodIcon(icon, minSize)) {
            return icon;
          }

          icons.push(icon);
        } catch {
          // skip this candidateUrl
        }
      }

      // do not try another htmlCandidateUrl website if some icon has been found
      if (icons.length > 0) {
        const [bestIcon] = sortIcons(icons);
        return bestIcon;
      }
    } catch {
      // skip this htmlCandidateUrl
    }
  }

  return null;
};

export default findIcon;
