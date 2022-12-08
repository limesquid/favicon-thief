import { CheerioAPI } from 'cheerio';
import { buildAbsoluteURL } from 'url-toolkit';

import type { Candidate } from '../types';

import getBaseHref from './getBaseHref';
import imageSizeComparator from './imageSizeComparator';
import parseLinkSizes from './parseLinkSizes';

const extractCandidates = ($: CheerioAPI, documentHref: string): Candidate[] => {
  const $links = [
    ...$('link[rel="shortcut icon"]'),
    ...$('link[rel="icon"]'),
    ...$('link[rel="apple-touch-icon"]'),
    ...$('link[rel="image_src"]'), // stackoverflow.com uses this attribute
  ];
  const baseHref = getBaseHref($, documentHref);
  const candidates = $links
    .filter(($link) => $($link).attr('href'))
    .map(($link) => {
      const linkHref = $($link).attr('href')!; // assured by filter() above
      const sizes = $($link).attr('sizes');
      const imageSizes = parseLinkSizes(sizes);
      const [maxSize = null] = imageSizes.sort(imageSizeComparator);
      const url = buildAbsoluteURL(baseHref, linkHref);

      return { size: maxSize, url };
    });

  return candidates;
};

export default extractCandidates;
