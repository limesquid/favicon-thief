const download = require('download');

const top500 = require('./top-500');

const { findIcon } = require('../build');

const MIME_TO_EXTENSION = {
  'image/png': '.png',
  'image/x-icon': '.ico',
  'image/jpg': '.jpg',
  'image/jpeg': '.jpeg',
  'image/bmp': '.bmp',
  'image/svg+xml': '.svg',
};

const runOne = async (website) => {
  const url = 'https://' + website;
  console.log('Checking', url);
  const icon = await findIcon(url);
  console.log(icon);
  console.log(icon.url, icon.mime);
  // const extension = MIME_TO_EXTENSION[icon.mime];
  // const filename = website + extension;
  // download(icon.url, `download/${filename}`);
};

const run = async () => {
  for (const website of top500) {
    runOne(website);
  }
};

run();
// runOne('sites.google.com');
