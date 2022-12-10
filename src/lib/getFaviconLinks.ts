import { CheerioAPI } from 'cheerio';
import { buildAbsoluteURL } from 'url-toolkit';
import isUrl from 'validator/lib/isURL';

import { FaviconLink } from '../types';

import getBaseHref from './getBaseHref';
import parseLinkSizes from './parseLinkSizes';
import sortFaviconLinks from './sortFaviconLinks';

const isFaviconUrl = (url: unknown): boolean => {
  if (typeof url !== 'string') {
    return false;
  }

  if (url.startsWith('/')) {
    return isUrl('http://example.com' + url, { protocols: ['http', 'https'] });
  }

  return isUrl(url, { protocols: ['http', 'https'] });
};

const getFaviconLinks = ($: CheerioAPI, documentHref: string): FaviconLink[] => {
  const $links = [
    ...$('link[rel="shortcut icon"]'),
    ...$('link[rel="icon"]'),
    ...$('link[rel="apple-touch-icon"]'),
    ...$('link[rel="image_src"]'), // stackoverflow.com uses this attribute
  ];
  const baseHref = getBaseHref($, documentHref);
  const faviconLinks: FaviconLink[] = $links
    .filter(($link) => isFaviconUrl($($link).attr('href')))
    .map(($link) => {
      const linkHref = $($link).attr('href')!;
      const linkSizes = $($link).attr('sizes');
      const sizes = parseLinkSizes(linkSizes);
      const url = buildAbsoluteURL(baseHref, linkHref);
      return { sizes, source: 'html', url };
    });

  return sortFaviconLinks(faviconLinks);
};

export default getFaviconLinks;
