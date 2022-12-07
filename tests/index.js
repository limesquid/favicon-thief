const download = require('download');
const fs = require('fs');
const mkdirp = require('mkdirp');

const { findIcon } = require('../build');

const top500 = require('./top-500-websites-list');

const DOWNLOAD_DIR = 'download';

const MIME_TO_EXTENSION = {
  'image/png': '.png',
  'image/x-icon': '.ico',
  'image/jpg': '.jpg',
  'image/jpeg': '.jpeg',
  'image/bmp': '.bmp',
  'image/svg+xml': '.svg',
  'image/webp': '.webp',
};

const HEADERS = {
  Accept: '*/*',
  // prevent to redirect to the mobile version of a website
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
};

const runOne = async (website) => {
  try {
    const url = 'http://' + website;
    console.log('Checking', url);

    const icon = await findIcon(url, {
      init: {
        headers: HEADERS,
        follow: 100,
      },
    });

    if (icon === null) {
      console.log({
        icon,
        website,
        url,
      });
    } else {
      const extension = MIME_TO_EXTENSION[icon.mime];
      const filename = website + extension;
      mkdirp(DOWNLOAD_DIR);
      fs.writeFileSync(`${DOWNLOAD_DIR}/${filename}`, await download(icon.url));
    }
  } catch (error) {
    console.error(error);
  }
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
