import fetch from 'node-fetch-cjs';

import { StringResponse } from '../types';

const fetchStringNode = async (
  url: string,
  headers?: Record<string, string>,
): Promise<StringResponse> => {
  const response = await fetch(url, { headers });

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

export default fetchStringNode;
