export const DEFAULT_USER_AGENT = 'Favicon Bot (https://www.npmjs.com/package/favicon-thief)';

export const MIN_GOOD_ICON_SIZE = 128 * 128;

export const ANY_SIZE = {
  // can be 9999 * 9999, etc.
  height: Math.sqrt(MIN_GOOD_ICON_SIZE),
  width: Math.sqrt(MIN_GOOD_ICON_SIZE),
};
