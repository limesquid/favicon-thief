import { URL } from 'url';

const getDefaultFaviconIcoUrl = (url: string): string => {
  const { origin } = new URL(url);
  const urlObject = new URL('favicon.ico', origin);
  return urlObject.href;
};

export default getDefaultFaviconIcoUrl;
