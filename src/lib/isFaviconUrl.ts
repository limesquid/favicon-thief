import isUrl from 'validator/lib/isURL';

const isFaviconUrl = (url: unknown): boolean => {
  if (typeof url !== 'string') {
    return false;
  }

  if (url.startsWith('/')) {
    return isUrl('http://example.com' + url, { protocols: ['http', 'https'] });
  }

  return isUrl(url, { protocols: ['http', 'https'] });
};

export default isFaviconUrl;
