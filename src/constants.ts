export const DEFAULT_PREFER_SQUARE = true;

export const DEFAULT_MIN_SIZE = 128 * 128;

export const DEFAULT_USER_AGENT = 'Favicon Bot (https://www.npmjs.com/package/favicon-thief)';

export const ANY_SIZE = {
  // can be 9999 * 9999, etc.
  height: Math.sqrt(DEFAULT_MIN_SIZE),
  width: Math.sqrt(DEFAULT_MIN_SIZE),
};
