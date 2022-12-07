const { findIcon } = require('../build');

const top500 = require('./top-500-websites-list');

const HEADERS = {
  Accept: '*/*',
  // prevent to redirect to the mobile version of a website
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
};

const runOne = async (website) => {
  const url = 'http://' + website;
  let icon = null;

  try {
    console.log(`🌐 ${website}`);
    icon = await findIcon(url, {
      init: {
        headers: HEADERS,
        follow: 100,
      },
    });
  } catch (error) {
    console.error(error);
  }

  console.log(`${icon === null ? '❌' : '✅'} ${website}`);
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
