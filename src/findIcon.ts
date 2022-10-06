import fetch from 'node-fetch';
import probeImageSize from 'probe-image-size';

import { DEFAULT_USER_AGENT } from './constants';
import {
  extractCandidates,
  getDefaultFaviconUrl,
  getHtmlCandidateUrls,
  isGoodIcon,
  sortIcons,
} from './lib';
import { Options, Icon } from './types';

/**
 * Tries to find an icon that represents given URL best.
 * Favors large and square icons.
 * It never throws.
 */
const findIcon = async (url: string, options: Options = {}): Promise<Icon | null> => {
  const { init } = options;
  const htmlCandidateUrls = getHtmlCandidateUrls(url);
  const htmlCandidateUrlsStack = [...htmlCandidateUrls].reverse();
  const icons: Icon[] = [];
  let htmlCandidateUrl: string | undefined;

  while ((htmlCandidateUrl = htmlCandidateUrlsStack.pop())) {
    try {
      const response = await fetch(htmlCandidateUrl, {
        ...init,
        headers: {
          'User-Agent': DEFAULT_USER_AGENT,
          ...(init ? init.headers : {}),
        },
      });

      if (response.ok) {
        const html = await response.text();
        const candidates = extractCandidates(html, htmlCandidateUrl);
        const candidatesUrls = [
          ...candidates.map(({ url }) => url),
          getDefaultFaviconUrl(htmlCandidateUrl),
        ];

        for (const iconCandidateUrl of candidatesUrls) {
          try {
            const iconInfo = await probeImageSize(iconCandidateUrl);

            // bail out early if good-enough icon already has been found
            if (isGoodIcon(iconInfo, options)) {
              return { url: iconCandidateUrl, info: iconInfo };
            }

            icons.push({
              url: iconCandidateUrl,
              info: iconInfo,
            });
          } catch {
            // skip this iconCandidateUrl
          }
        }

        // do not try another htmlCandidateUrl website if some icon has been found
        if (icons.length > 0) {
          const [bestIconCandidate] = sortIcons(icons);
          return bestIconCandidate;
        }
      }
    } catch {
      // skip this htmlCandidateUrl
    }
  }

  return null;
};

export default findIcon;
