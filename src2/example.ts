import fetch, { RequestInit } from 'node-fetch-cjs';
import probeImageSize, { ProbeResult } from 'probe-image-size';

import { imageSizeComparator } from './lib';
import findFaviconLinks from './findFaviconLinks';
import { StringResponse } from './types';

const MIN_SIZE = 256 * 256;

const findIcon = async (url: string, init?: RequestInit): Promise<ProbeResult | null> => {
  const faviconLinks = await findFaviconLinks(url, (url) => getStringWithNodeFetch(url, init));
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
        console.error(error);
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

const findIcons = async (url: string, init?: RequestInit): Promise<ProbeResult[]> => {
  const faviconLinks = await findFaviconLinks(url, (url) => getStringWithNodeFetch(url, init));
  const headers = { ...init?.headers };
  const icons: ProbeResult[] = [];

  for (const faviconLink of faviconLinks) {
    try {
      const icon = await probeImageSize(faviconLink.url, { headers });
      icons.push(icon);
    } catch (error) {
      // skip this faviconLink.url

      if (process.env.NODE_ENV === 'test') {
        console.error(error);
      }
    }
  }

  return icons.sort(imageSizeComparator);
};

const getStringWithNodeFetch = async (url: string, init?: RequestInit): Promise<StringResponse> => {
  const response = await fetch(url, init);

  if (!response.ok) {
    const error = `Failed to fetch ${url}: ${response.status} ${response.statusText}`;

    try {
      const message = await response.text();
      const finalError = [error, message].join('\n');
      throw new Error(finalError);
    } catch {
      throw new Error(error);
    }
  }

  return {
    data: await response.text(),
    url: response.url,
  };
};

const isGoodIcon = (icon: ProbeResult, minSize: number): boolean => {
  const isMinSize = icon.width * icon.height >= minSize;
  const isSquare = icon.width === icon.height;
  return isSquare && isMinSize;
};
