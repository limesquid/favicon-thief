import parseSize from './parseSize';

describe('parseSize', () => {
  const tests = [
    { input: '', expected: null },
    { input: 'x', expected: null },
    { input: '2x', expected: null },
    { input: 'x3', expected: null },
    { input: '2x3', expected: { width: 2, height: 3 } },
  ];

  for (const { input, expected } of tests) {
    it(input, () => {
      expect(parseSize(input)).toEqual(expected);
    });
  }
});
