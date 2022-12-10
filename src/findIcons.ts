import { RequestInit } from 'node-fetch-cjs';
import probeImageSize, { ProbeResult } from 'probe-image-size';

import findFaviconLinks from './findFaviconLinks';
import getStringWithNodeFetch from './getStringWithNodeFetch';
import getStringWithPuppeteer from './getStringWithPuppeteer';
import { imageSizeComparator } from './lib';

const findIcons = async (url: string, init?: RequestInit): Promise<ProbeResult[]> => {
  const faviconLinks = await findFaviconLinks(url, async (url) => {
    try {
      return await getStringWithNodeFetch(url, init);
    } catch {
      return await getStringWithPuppeteer(url);
    }
  });
  const headers = { ...init?.headers };
  const icons: ProbeResult[] = [];

  for (const faviconLink of faviconLinks) {
    try {
      const icon = await probeImageSize(faviconLink.url, { headers });
      icons.push(icon);
    } catch (error) {
      // skip this faviconLink.url

      if (process.env.NODE_ENV === 'test') {
        console.error({ url, error });
      }
    }
  }

  return icons.sort(imageSizeComparator);
};

export default findIcons;
