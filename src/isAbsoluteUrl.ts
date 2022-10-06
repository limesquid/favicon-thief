// Copied from https://github.com/sindresorhus/is-absolute-url/blob/84ecee4/index.js
// Because of EJS errors :)

// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;

// Windows paths like `c:\`
const WINDOWS_PATH_REGEX = /^[a-zA-Z]:\\/;

function isAbsoluteUrl(url: string): boolean {
  if (typeof url !== 'string') {
    throw new TypeError(`Expected a \`string\`, got \`${typeof url}\``);
  }

  if (WINDOWS_PATH_REGEX.test(url)) {
    return false;
  }

  return ABSOLUTE_URL_REGEX.test(url);
}

export default isAbsoluteUrl;
