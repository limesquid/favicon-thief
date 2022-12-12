# favicon-thief

Find the best favicon for a given URL.

Powers [https://websktop.com](https://websktop.com).

![Version](https://img.shields.io/github/package-json/v/limesquid/favicon-thief)
![License](https://img.shields.io/npm/l/favicon-thief)
![Node version](https://img.shields.io/node/v/favicon-thief)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/limesquid/favicon-thief)
![Build](https://github.com/limesquid/favicon-thief/workflows/Build/badge.svg)
![Test](https://github.com/limesquid/favicon-thief/workflows/Test/badge.svg)
![Prettier](https://github.com/limesquid/favicon-thief/workflows/Prettier/badge.svg)

# Installation

```Shell
npm install favicon-thief --save
```

# API

## `getFavicons`

Uses [`findFavicons`](#findfavicons) to get all favicons that represent given URL. Uses [node-fetch](https://github.com/node-fetch/node-fetch) & [puppeteer](https://github.com/puppeteer/puppeteer) to crawl webpages.

- Results are sorted - best first.
- Favors vector images, square images, and large images (in that order).

It's a wrapper for [`findFavicons`](#findfavicons) that provides [`fetch`](https://github.com/limesquid/favicon-thief/pull/25/files#diff-eaacc35d5a5d88d1ede34aa0d4e69ca13c836d6e7702357865a70b2aba584880R22) implementations.

```ts
import { getFavicons } from 'favicon-thief';

const favicons = await getFavicons('https://websktop.com');

console.log(JSON.stringify(favicons, null, 2));
// [
//   {
//     "sizes": [
//       {
//         "width": 144,
//         "height": 144
//       }
//     ],
//     "source": "html",
//     "url": "https://www.youtube.com/s/desktop/25bf5aae/img/favicon_144x144.png"
//   },
//   {
//     "sizes": [
//       {
//         "width": 96,
//         "height": 96
//       }
//     ],
//     "source": "html",
//     "url": "https://www.youtube.com/s/desktop/25bf5aae/img/favicon_96x96.png"
//   },
//   {
//     "sizes": [
//       {
//         "width": 48,
//         "height": 48
//       }
//     ],
//     "source": "html",
//     "url": "https://www.youtube.com/s/desktop/25bf5aae/img/favicon_48x48.png"
//   },
//   {
//     "sizes": [
//       {
//         "width": 32,
//         "height": 32
//       }
//     ],
//     "source": "html",
//     "url": "https://www.youtube.com/s/desktop/25bf5aae/img/favicon_32x32.png"
//   },
//   {
//     "sizes": [],
//     "source": "html",
//     "url": "https://www.youtube.com/s/desktop/25bf5aae/img/favicon.ico"
//   },
//   {
//     "sizes": [],
//     "source": "guess",
//     "url": "https://www.youtube.com/favicon.ico"
//   },
//   {
//     "sizes": [],
//     "source": "guess",
//     "url": "https://youtube.com/favicon.ico"
//   }
// ]
```

## `findFavicons`

Finds all favicons that represent given URL.

- Pass your own fetching function.
- Results are sorted - best first.
- Favors vector images, square images, and large images (in that order).
- It never throws.

```ts
import { findFavicons } from 'favicon-thief';

const myFetch = async (url: string): string => {
  // bring your own fetching implementation - turn `url` into html here
  return {
    data: '<html><head><link rel="icon" href="icon.png" sizes="160x160"></head></html>',
    url, // return different url if there was a redirect
  };
};

const favicons = await findFavicons('http://example.com', myFetch);

console.log(JSON.stringify(favicons, null, 2));
// [
//   {
//     "sizes": [
//       {
//         "width": 160,
//         "height": 160
//       }
//     ],
//     "source": "html",
//     "url": "http://example.com/icon.png"
//   },
//   {
//     "sizes": [],
//     "source": "guess",
//     "url": "http://example.com/favicon.ico"
//   }
// ]
```
