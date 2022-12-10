import { CheerioAPI } from 'cheerio';
import { buildAbsoluteURL } from 'url-toolkit';

import getBaseHref from './getBaseHref';
import parseLinkSizes from './parseLinkSizes';

import { FaviconLink } from '../types';

const getFaviconLinks = ($: CheerioAPI, documentHref: string): FaviconLink[] => {
  const $links = [
    ...$('link[rel="shortcut icon"]'),
    ...$('link[rel="icon"]'),
    ...$('link[rel="apple-touch-icon"]'),
    ...$('link[rel="image_src"]'), // stackoverflow.com uses this attribute
  ];
  const baseHref = getBaseHref($, documentHref);
  const faviconLinks = $links
    .filter(($link) => $($link).attr('href'))
    .map(($link) => {
      const linkHref = $($link).attr('href')!; // assured by filter() above
      const linkSizes = $($link).attr('sizes');
      const sizes = parseLinkSizes(linkSizes);
      const url = buildAbsoluteURL(baseHref, linkHref);
      return { sizes, url };
    });

  return faviconLinks;
};

export default getFaviconLinks;
