import getDefaultFaviconUrl from './getDefaultFaviconUrl';

describe('getDefaultFaviconUrl', () => {
  it('https://example.com', () => {
    expect(getDefaultFaviconUrl('https://example.com')).toBe('https://example.com/favicon.ico');
  });

  it('https://example.com/x/y/z?xyz=123', () => {
    expect(getDefaultFaviconUrl('https://example.com/x/y/z?xyz=123')).toBe(
      'https://example.com/favicon.ico',
    );
  });
});
