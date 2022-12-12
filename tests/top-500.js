const { DEFAULT_REQUEST_TIMEOUT, getFavicons } = require('../build');

const top500 = require('./top-500-websites-list');

const HEADERS = {
  Accept: '*/*',
  // prevent to redirect to the mobile version of a website
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
};

const runOne = async (website) => {
  const url = 'http://' + website;
  let icons = null;

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, DEFAULT_REQUEST_TIMEOUT);

  try {
    console.log(`🌐 ${website}`);
    icons = await getFavicons(url, {
      headers: HEADERS,
      signal: controller.signal,
    });
  } catch (error) {
    console.error({ url, error });
  } finally {
    clearTimeout(timeout);
  }

  const icon = (icons && icons.find((icon) => icon.source !== 'guess')) || icons[0];
  const emoji = icon === null ? '❌' : icon.source === 'guess' ? '☑️ ' : '✅';
  console.log(`${emoji} ${website}${icon ? ` - ${icon.url}` : ''}`);
};

const run = async () => {
  const websites = [...top500];

  while (websites.length > 0) {
    const CHUNK_SIZE = 5;
    const chunk = websites.splice(0, CHUNK_SIZE);
    await Promise.all(chunk.map(runOne));
  }
};

run();
