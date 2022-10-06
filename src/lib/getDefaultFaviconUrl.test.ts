import getDefaultFaviconUrl from './getDefaultFaviconUrl';

describe('getDefaultFaviconUrl', () => {
  const tests = [
    { input: 'https://example.com', expected: 'https://example.com/favicon.ico' },
    { input: 'https://example.com/x/y/z?xyz=123', expected: 'https://example.com/favicon.ico' },
  ];

  for (const { input, expected } of tests) {
    it(input, () => {
      expect(getDefaultFaviconUrl(input)).toEqual(expected);
    });
  }
});
