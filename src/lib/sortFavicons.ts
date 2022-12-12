import type { Favicon } from '../types';

import imageSizeComparator from './imageSizeComparator';

const sortFavicons = (faviconLinks: Favicon[]): Favicon[] => {
  return [...faviconLinks].sort((faviconLink1, faviconLink2) => {
    return imageSizeComparator(faviconLink1.sizes[0], faviconLink2.sizes[0]);
  });
};

export default sortFavicons;
