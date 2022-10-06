import type { RequestInit, Response } from 'node-fetch';

const fetch = async (url: string, init?: RequestInit): Promise<Response> => {
  const nodeFetch = await import('node-fetch');
  return nodeFetch.default(url, init);
};

export default fetch;
