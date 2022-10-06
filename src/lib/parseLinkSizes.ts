import { ANY_SIZE } from '../constants';
import { ImageSize } from '../types';

import parseSize from './parseSize';

const parseLinkSizes = (sizes: string | undefined): ImageSize[] => {
  if (!sizes) {
    return [];
  }

  if (sizes === 'any') {
    return [ANY_SIZE];
  }

  const imageSizes = sizes.replace(/\s+/gm, ' ').toLowerCase().split(' ').map(parseSize);
  return imageSizes.filter(Boolean) as ImageSize[];
};

export default parseLinkSizes;
