import fetch from 'node-fetch';
import probeImageSize from 'probe-image-size';

import extractIconCandidates from './extractIconCandidates';
import getDefaultFaviconIcoUrl from './getDefaultFaviconIcoUrl';
import getHtmlCandidateUrls from './getHtmlCandidateUrls';
import isGoodIcon from './isGoodIcon';
import sortIcons from './sortIcons';
import { Icon } from './types';

const REQUEST_HEADERS = {
  'User-Agent': 'Favicon Bot (https://www.npmjs.com/package/favicon-thief)',
};

/**
 * Tries to find an icon that represents given URL best.
 * Favors large and square icons.
 * It never throws.
 */
const findIcon = async (url: string): Promise<Icon | null> => {
  const htmlCandidateUrls = getHtmlCandidateUrls(url);
  const htmlCandidateUrlsStack = [...htmlCandidateUrls].reverse();
  const icons: Icon[] = [];
  let htmlCandidateUrl: string | undefined;

  while ((htmlCandidateUrl = htmlCandidateUrlsStack.pop())) {
    try {
      const response = await fetch(htmlCandidateUrl, { headers: REQUEST_HEADERS });

      if (response.ok) {
        const html = await response.text();
        const iconCandidates = extractIconCandidates(html, htmlCandidateUrl);
        const iconCandidatesUrls = [
          ...iconCandidates.map(({ url }) => url),
          getDefaultFaviconIcoUrl(htmlCandidateUrl),
        ];

        for (const iconCandidateUrl of iconCandidatesUrls) {
          try {
            const iconInfo = await probeImageSize(iconCandidateUrl);

            // bail out early if good-enough icon already has been found
            if (isGoodIcon(iconInfo)) {
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
