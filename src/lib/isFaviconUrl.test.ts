import isFaviconUrl from './isFaviconUrl';

describe('isFaviconUrl', () => {
  const tests = [
    { input: 'https://example.com', expected: true },
    { input: 'https://example.com/favicon.ico', expected: true },
    { input: 'example.com', expected: true },
    { input: 'example.com/favicon.ico', expected: true },
    { input: '//example.com/favicon.ico', expected: true },
    { input: '/favicon.ico', expected: true },
    { input: '//favicon.ico', expected: true },
    { input: 'example', expected: false },
    { input: '//example', expected: false },
    { input: '///', expected: false },
    { input: 'mailto:example@example.com', expected: false },
  ];

  for (const { input, expected } of tests) {
    it(input, () => {
      expect(isFaviconUrl(input, 'https://example.com')).toBe(expected);
    });
  }
});
