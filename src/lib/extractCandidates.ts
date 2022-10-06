import { load } from 'cheerio';
import { buildAbsoluteURL } from 'url-toolkit';

import { Candidate } from '../types';

import getBaseHref from './getBaseHref';
import parseLinkRelIconSizes from './parseLinkRelIconSizes';
import sortCandidates from './sortCandidates';

const extractCandidates = (html: string, documentHref: string): Candidate[] => {
  const $ = load(html);
  const $links = [
    ...$('link[rel="shortcut icon"]'),
    ...$('link[rel="icon"]'),
    ...$('link[rel="apple-touch-icon"]'),
    ...$('link[rel="image_src"]'), // stackoverflow.com uses this attribute
  ];
  const baseHref = getBaseHref(html, documentHref);
  const candidates = [
    ...$links
      .filter(($link) => $($link).attr('href'))
      .map(($link) => {
        const linkHref = $($link).attr('href')!; // assured by filter() above
        const sizes = $($link).attr('sizes');

        return {
          url: buildAbsoluteURL(baseHref, linkHref),
          info: parseLinkRelIconSizes(sizes),
        };
      }),
  ];

  return sortCandidates(candidates);
};

export default extractCandidates;
