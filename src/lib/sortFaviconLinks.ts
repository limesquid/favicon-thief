import type { FaviconLink } from '../types';

import imageSizeComparator from './imageSizeComparator';

const sortFaviconLinks = (faviconLinks: FaviconLink[]): FaviconLink[] => {
  return [...faviconLinks].sort((faviconLink1, faviconLink2) => {
    return imageSizeComparator(faviconLink1.sizes[0], faviconLink2.sizes[0]);
  });
};

export default sortFaviconLinks;
