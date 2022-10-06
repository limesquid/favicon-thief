import { URL } from 'url';

const getDefaultFaviconUrl = (url: string): string => {
  const { origin } = new URL(url);
  const urlObject = new URL('favicon.ico', origin);
  return urlObject.href;
};

export default getDefaultFaviconUrl;
