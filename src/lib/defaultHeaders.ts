import type { RequestInit } from 'node-fetch-cjs';

const defaultHeaders = (init?: RequestInit, headers?: RequestInit['headers']): RequestInit => ({
  ...init,
  headers: {
    ...headers,
    ...init?.headers,
  },
});

export default defaultHeaders;
