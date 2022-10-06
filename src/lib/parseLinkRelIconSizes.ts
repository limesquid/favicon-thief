import { ANY_SIZE } from '../constants';
import { ImageSize } from '../types';

import compareIcons from './compareIcons';

const parseLinkRelIconSize = (size: string): ImageSize | null => {
  const [widthString, heightString] = size.split('x');
  const width = parseInt(widthString, 10);
  const height = parseInt(heightString, 10);

  if (Number.isNaN(width) || Number.isNaN(height)) {
    return null;
  }

  return { width, height };
};

const parseLinkRelIconSizes = (sizes: string | undefined): ImageSize | null => {
  if (!sizes) {
    return null;
  }

  if (sizes === ANY_SIZE) {
    return ANY_SIZE;
  }

  const supportedSizes = sizes.toLowerCase().split(' ').map(parseLinkRelIconSize);
  const [bestSize = null] = supportedSizes.sort(compareIcons);

  return bestSize;
};

export default parseLinkRelIconSizes;
