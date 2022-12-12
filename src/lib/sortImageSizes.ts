import type { ImageSize } from '../types';

import imageSizeComparator from './imageSizeComparator';

const sortImageSizes = <Size extends ImageSize>(sizes: Size[]): Size[] => {
  return [...sizes].sort(imageSizeComparator);
};

export default sortImageSizes;
