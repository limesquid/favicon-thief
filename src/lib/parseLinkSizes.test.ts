import { ANY_SIZE } from '../constants';

import parseLinkSizes from './parseLinkSizes';

describe('parseLinkSizes', () => {
  const tests = [
    { input: undefined, expected: [] },
    { input: 'any', expected: [ANY_SIZE] },
    { input: '150x200', expected: [{ width: 150, height: 200 }] },
    {
      input: '150x200 \n 300x400    500x600',
      expected: [
        { width: 500, height: 600 },
        { width: 300, height: 400 },
        { width: 150, height: 200 },
      ],
    },
  ];

  for (const { input, expected } of tests) {
    it(String(input), () => {
      expect(parseLinkSizes(input)).toEqual(expected);
    });
  }
});
