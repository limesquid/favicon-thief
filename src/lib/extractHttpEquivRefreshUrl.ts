import { CheerioAPI } from 'cheerio';
import parseHttpEquivRefresh from './parseHttpEquivRefresh';

const extractHttpEquivRefreshUrl = ($: CheerioAPI): string | null => {
  const $meta = [...$('meta[http-equiv]')].filter(
    ($meta) => $meta.attribs['http-equiv'].toLocaleLowerCase() === 'refresh',
  );

  if ($meta.length === 0) {
    return null;
  }

  const $metaHttpEquivRefresh = $meta[0];
  const httpEquivRefresh = parseHttpEquivRefresh($metaHttpEquivRefresh.attribs.content);

  return httpEquivRefresh.url;
};

export default extractHttpEquivRefreshUrl;
