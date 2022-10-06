import probeImageSize from 'probe-image-size';

import { getCandidateUrls, getHtmlCandidateUrls, isGoodIcon, sortIcons } from './lib';
import { Options, Icon } from './types';

/**
 * Tries to find an icon that represents given URL best.
 * Favors vector images, square images, and then large images.
 * It never throws.
 */
const findIcon = async (url: string, options: Options = {}): Promise<Icon | null> => {
  const htmlCandidateUrls = getHtmlCandidateUrls(url);
  const htmlCandidateUrlsStack = [...htmlCandidateUrls].reverse();
  const icons: Icon[] = [];
  let htmlCandidateUrl: string | undefined;

  while ((htmlCandidateUrl = htmlCandidateUrlsStack.pop())) {
    try {
      const candidateUrls = await getCandidateUrls(htmlCandidateUrl, options);

      for (const candidateUrl of candidateUrls) {
        try {
          const info = await probeImageSize(candidateUrl);
          const icon = { url: candidateUrl, info };

          // bail out early if good-enough icon already has been found
          if (isGoodIcon(info, options)) {
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
