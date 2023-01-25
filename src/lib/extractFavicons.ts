import type { CheerioAPI } from 'cheerio';
import { buildAbsoluteURL } from 'url-toolkit';

import { Favicon } from '../types';

import extractBaseHref from './extractBaseHref';
import isFaviconUrl from './isFaviconUrl';
import parseLinkSizes from './parseLinkSizes';
import sortFavicons from './sortFavicons';

const extractFavicons = ($: CheerioAPI, documentHref: string): Favicon[] => {
  const $links = [
    ...$('link[rel="shortcut icon"]'),
    ...$('link[rel="icon"]'),
    ...$('link[rel="apple-touch-icon"]'),
    ...$('link[rel="image_src"]'), // stackoverflow.com uses this attribute
  ];
  const baseHref = extractBaseHref($, documentHref);
  const faviconLinks: Favicon[] = $links
    .filter(($link) => isFaviconUrl($($link).attr('href'), documentHref))
    .map(($link) => {
      const linkHref = $($link).attr('href')!;
      const linkSizes = $($link).attr('sizes');
      const sizes = parseLinkSizes(linkSizes);
      const url = buildAbsoluteURL(baseHref, linkHref);

      return { sizes, source: 'html', url };
    });

  return sortFavicons(faviconLinks);
};

export default extractFavicons;
