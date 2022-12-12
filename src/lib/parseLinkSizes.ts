import { ANY_SIZE } from '../constants';
import type { ImageSize } from '../types';

import imageSizeComparator from './imageSizeComparator';
import parseSize from './parseSize';

const parseLinkSizes = (sizes: string | undefined): ImageSize[] => {
  if (!sizes) {
    return [];
  }

  if (sizes === 'any') {
    return [ANY_SIZE];
  }

  const imageSizes = sizes.split(/\s+/).map(parseSize);
  const validImageSizes = imageSizes.filter(Boolean) as ImageSize[];

  return validImageSizes.sort(imageSizeComparator);
};

export default parseLinkSizes;
