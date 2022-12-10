import { URL } from 'url';

const guessFaviconUrl = (url: string): string => {
  const { origin } = new URL(url);
  const urlObject = new URL('favicon.ico', origin);
  return urlObject.href;
};

export default guessFaviconUrl;
