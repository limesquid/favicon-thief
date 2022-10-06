# favicon-thief

Find the best favicon for a given URL.

![Version](https://img.shields.io/github/package-json/v/limesquid/favicon-thief)
![License](https://img.shields.io/npm/l/favicon-thief)
![Node version](https://img.shields.io/node/v/favicon-thief)
![Dependencies](https://img.shields.io/librariesio/github/limesquid/favicon-thief)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/limesquid/favicon-thief)
![Prettier](https://github.com/limesquid/favicon-thief/workflows/Prettier/badge.svg)

# Installation

## npm

```Shell
npm install favicon-thief --save
```

## yarn

```Shell
yarn add favicon-thief
```

# API

## `findIcon`

Finds an icon that represents given URL best.

- favors vector images, square images, and large images (in that order)
- it's faster than `findIcons`
- it never throws

```ts
import { findIcon } from 'favicon-thief';

const icon = await findIcon('https://duckduckgo.com');

console.log(icon);
// {
//   width: 256,
//   height: 256,
//   type: 'png',
//   mime: 'image/png',
//   wUnits: 'px',
//   hUnits: 'px',
//   length: 6693,
//   url: 'https://duckduckgo.com/assets/icons/meta/DDG-icon_256x256.png'
// }
```

## `findIcons`

Finds all icons that represent given URL.

- results are sorted - best first
- favors vector images, square images, and large images (in that order)
- it never throws

```ts
import { findIcons } from 'favicon-thief';

const icons = await findIcons('https://duckduckgo.com');

console.log(icons);
// [
//   {
//     width: 256,
//     height: 256,
//     type: 'png',
//     mime: 'image/png',
//     wUnits: 'px',
//     hUnits: 'px',
//     length: 6693,
//     url: 'https://duckduckgo.com/assets/icons/meta/DDG-icon_256x256.png'
//   },
//   {
//     width: 152,
//     height: 152,
//     type: 'png',
//     mime: 'image/png',
//     wUnits: 'px',
//     hUnits: 'px',
//     length: 2034,
//     url: 'https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_152x152.png'
//   },
//   {
//     width: 120,
//     height: 120,
//     type: 'png',
//     mime: 'image/png',
//     wUnits: 'px',
//     hUnits: 'px',
//     length: 1652,
//     url: 'https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_120x120.png'
//   },
//   {
//     width: 76,
//     height: 76,
//     type: 'png',
//     mime: 'image/png',
//     wUnits: 'px',
//     hUnits: 'px',
//     length: 1144,
//     url: 'https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_76x76.png'
//   },
//   {
//     width: 60,
//     height: 60,
//     type: 'png',
//     mime: 'image/png',
//     wUnits: 'px',
//     hUnits: 'px',
//     length: 866,
//     url: 'https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_60x60.png'
//   },
//   {
//     width: 32,
//     height: 32,
//     variants: [ [Object], [Object] ],
//     type: 'ico',
//     mime: 'image/x-icon',
//     wUnits: 'px',
//     hUnits: 'px',
//     length: 5430,
//     url: 'https://duckduckgo.com/favicon.ico'
//   }
// ]
```
