import { CheerioAPI } from 'cheerio';
import { buildAbsoluteURL } from 'url-toolkit';

import isAbsoluteUrl from './isAbsoluteUrl';

const getBaseHref = ($: CheerioAPI, documentHref: string): string => {
  const [$base] = Array.from($('base'));
  const baseHref = $base && $($base).attr('href');
  const isBaseHrefAbsolute = baseHref ? isAbsoluteUrl(baseHref) : false;

  return baseHref
    ? isBaseHrefAbsolute
      ? baseHref
      : buildAbsoluteURL(documentHref, baseHref)
    : documentHref;
};

export default getBaseHref;
