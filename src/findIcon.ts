import { RequestInit } from 'node-fetch-cjs';
import probeImageSize, { ProbeResult } from 'probe-image-size';

import fetchFaviconLinks from './fetchFaviconLinks';
import { imageSizeComparator } from './lib';

const MIN_SIZE = 256 * 256;

const findIcon = async (url: string, init?: RequestInit): Promise<ProbeResult | null> => {
  const faviconLinks = await fetchFaviconLinks(url, init);
  const headers = { ...init?.headers };
  const icons: ProbeResult[] = [];

  for (const faviconLink of faviconLinks) {
    try {
      const icon = await probeImageSize(faviconLink.url, { headers });

      // bail out early if good-enough icon already has been found
      if (isGoodIcon(icon, MIN_SIZE)) {
        return icon;
      }

      icons.push(icon);
    } catch (error) {
      // skip this faviconLink.url

      if (process.env.NODE_ENV === 'test') {
        console.error({ url, error });
      }
    }
  }

  // do not try another htmlCandidateUrl website if some icon has been found
  if (icons.length === 0) {
    return null;
  }

  const [bestIcon] = [...icons].sort(imageSizeComparator);
  return bestIcon;
};

const isGoodIcon = (icon: ProbeResult, minSize: number): boolean => {
  const isMinSize = icon.width * icon.height >= minSize;
  const isSquare = icon.width === icon.height;
  return isSquare && isMinSize;
};

export default findIcon;
