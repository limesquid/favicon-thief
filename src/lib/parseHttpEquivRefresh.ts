interface Result {
  timeout: number | null;
  url: string | null;
}

// https://github.com/stevenvachon/http-equiv-refresh/blob/73acde2936e62181920717ba45ca4c6b7ad1b5d4/index.js#L1
const PATTERN = /^\s*(\d+)(?:\s*;(?:\s*url\s*=)?\s*(?:["']\s*(.*?)\s*['"]|(.*?)))?\s*$/i;

const parseHttpEquivRefresh = (content: string): Result => {
  const matches = PATTERN.exec(content);
  let timeout = null;
  let url = null;

  if (matches !== null) {
    timeout = parseInt(matches[1], 10);
    url = matches[2] || matches[3] || null;
  }

  return { timeout, url };
};

export default parseHttpEquivRefresh;
