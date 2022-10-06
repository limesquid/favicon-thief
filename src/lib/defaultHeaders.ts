import type { RequestInit } from 'node-fetch';

const defaultHeaders = (init?: RequestInit, headers?: RequestInit['headers']): RequestInit => ({
  ...init,
  headers: {
    ...headers,
    ...init?.headers,
  },
});

export default defaultHeaders;
