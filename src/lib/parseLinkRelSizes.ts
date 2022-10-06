import { ANY_SIZE } from '../constants';
import { ImageSize } from '../types';

const parseLinkRelSize = (size: string): ImageSize | null => {
  const [widthString, heightString] = size.split('x');
  const width = parseInt(widthString, 10);
  const height = parseInt(heightString, 10);

  if (Number.isNaN(width) || Number.isNaN(height)) {
    return null;
  }

  return { width, height };
};

const parseLinkRelSizes = (sizes: string | undefined): ImageSize[] => {
  if (!sizes) {
    return [];
  }

  if (sizes === 'any') {
    return [ANY_SIZE];
  }

  const imageSizes = sizes.replace(/\s+/gm, ' ').toLowerCase().split(' ').map(parseLinkRelSize);
  return imageSizes.filter(Boolean) as ImageSize[];
};

export default parseLinkRelSizes;
