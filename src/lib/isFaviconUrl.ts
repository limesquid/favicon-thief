import isUrl from 'validator/lib/isURL';

const isFaviconUrl = (url: unknown, documentHref: string): boolean => {
  const { origin, protocol } = new URL(documentHref);

  if (typeof url !== 'string') {
    return false;
  }

  if (url.startsWith('//')) {
    return isUrl(protocol + url, { protocols: ['http', 'https'] });
  }

  if (url.startsWith('/')) {
    return isUrl(origin + url, { protocols: ['http', 'https'] });
  }

  return isUrl(url, { protocols: ['http', 'https'] });
};

export default isFaviconUrl;
