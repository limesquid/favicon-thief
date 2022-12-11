import fetch, { RequestInit } from 'node-fetch-cjs';

import { StringResponse } from './types';

const crawlWithFetch = async (
  url: string,
  init?: RequestInit,
): Promise<StringResponse> => {
  const response = await fetch(url, init);

  if (!response.ok) {
    const error = `Failed to fetch ${url}: ${response.status} ${response.statusText}`;

    try {
      const message = await response.text();
      const finalError = [error, message].join('\n');
      throw new Error(finalError);
    } catch {
      throw new Error(error);
    }
  }

  return {
    data: await response.text(),
    url: response.url,
  };
};

export default crawlWithFetch;
