import getHtmlCandidateUrls from './getHtmlCandidateUrls';

describe('getHtmlCandidateUrls', () => {
  const tests = [
    { input: 'https://example.com', expected: ['https://example.com'] },
    {
      input: 'https://example.com/xyz',
      expected: ['https://example.com', 'https://example.com/xyz'],
    },
    {
      input: 'https://example.com:3333',
      expected: ['https://example.com:3333', 'https://example.com'],
    },
  ];

  for (const { input, expected } of tests) {
    it(input, () => {
      expect(getHtmlCandidateUrls(input)).toEqual(expected);
    });
  }
});
