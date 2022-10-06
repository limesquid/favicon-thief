import getHtmlCandidateUrls from './getHtmlCandidateUrls';

describe('getHtmlCandidateUrls', () => {
  it('https://example.com', () => {
    expect(getHtmlCandidateUrls('https://example.com')).toEqual(['https://example.com']);
  });

  it('https://example.com/xyz', () => {
    expect(getHtmlCandidateUrls('https://example.com/xyz')).toEqual([
      'https://example.com',
      'https://example.com/xyz',
    ]);
  });

  it('https://example.com:3333', () => {
    expect(getHtmlCandidateUrls('https://example.com:3333')).toEqual([
      'https://example.com:3333',
      'https://example.com',
    ]);
  });
});
