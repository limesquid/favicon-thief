import { ANY_SIZE } from '../constants';

import parseLinkRelSizes from './parseLinkRelSizes';

describe('parseLinkRelSizes', () => {
  const tests = [
    { input: undefined, expected: [] },
    { input: 'any', expected: [ANY_SIZE] },
    { input: '150x200', expected: [{ width: 150, height: 200 }] },
    {
      input: '150x200 \n 300x400    500x600',
      expected: [
        { width: 150, height: 200 },
        { width: 300, height: 400 },
        { width: 500, height: 600 },
      ],
    },
  ];

  for (const { input, expected } of tests) {
    it(String(input), () => {
      expect(parseLinkRelSizes(input)).toEqual(expected);
    });
  }
});
