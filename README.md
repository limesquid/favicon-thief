# favicon-thief

Find the best favicon for a given URL.

Powers [https://websktop.com](https://websktop.com).

![Version](https://img.shields.io/github/package-json/v/limesquid/favicon-thief)
![License](https://img.shields.io/npm/l/favicon-thief)
![Node version](https://img.shields.io/node/v/favicon-thief)
![Dependencies](https://img.shields.io/librariesio/github/limesquid/favicon-thief)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/limesquid/favicon-thief)
![Build](https://github.com/limesquid/favicon-thief/workflows/Build/badge.svg)
![Test](https://github.com/limesquid/favicon-thief/workflows/Test/badge.svg)
![Prettier](https://github.com/limesquid/favicon-thief/workflows/Prettier/badge.svg)

![alt favicon-thief usage at https://websktop.com](https://raw.githubusercontent.com/limesquid/favicon-thief/master/img/screenshot.jpg)

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

### `minSize` option

Function will return as soon as an icon with dimensions greater than this parameter is found. Defaults to `256 * 256`.

If no icon with given size is found, still, largest found icon will be returned.

```ts
import { findIcon } from 'favicon-thief';

const icon = await findIcon('https://duckduckgo.com', {
  minSize: 128 * 128,
});

console.log(icon.width + 'x' + icon.height);
// 152x152
```

## `findIcons`

Finds all icons that represent given URL.

- results are sorted - best first
- favors vector images, square images, and large images (in that order)
- it never throws

```ts
import { findIcons } from 'favicon-thief';

const icons = await findIcons('https://duckduckgo.com');

console.table(icons);
// ┌─────────┬───────┬────────┬───────┬────────────────┬────────┬────────┬────────┬─────────────────────────────────────────────────────────────────────┬────────────────────────┐
// │ (index) │ width │ height │ type  │      mime      │ wUnits │ hUnits │ length │                                 url                                 │        variants        │
// ├─────────┼───────┼────────┼───────┼────────────────┼────────┼────────┼────────┼─────────────────────────────────────────────────────────────────────┼────────────────────────┤
// │    0    │  256  │  256   │ 'png' │  'image/png'   │  'px'  │  'px'  │  6693  │   'https://duckduckgo.com/assets/icons/meta/DDG-icon_256x256.png'   │                        │
// │    1    │  152  │  152   │ 'png' │  'image/png'   │  'px'  │  'px'  │  2034  │ 'https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_152x152.png' │                        │
// │    2    │  120  │  120   │ 'png' │  'image/png'   │  'px'  │  'px'  │  1652  │ 'https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_120x120.png' │                        │
// │    3    │  76   │   76   │ 'png' │  'image/png'   │  'px'  │  'px'  │  1144  │  'https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_76x76.png'  │                        │
// │    4    │  60   │   60   │ 'png' │  'image/png'   │  'px'  │  'px'  │  866   │  'https://duckduckgo.com/assets/icons/meta/DDG-iOS-icon_60x60.png'  │                        │
// │    5    │  32   │   32   │ 'ico' │ 'image/x-icon' │  'px'  │  'px'  │  5430  │                'https://duckduckgo.com/favicon.ico'                 │ [ [Object], [Object] ] │
// └─────────┴───────┴────────┴───────┴────────────────┴────────┴────────┴────────┴─────────────────────────────────────────────────────────────────────┴────────────────────────┘
```
