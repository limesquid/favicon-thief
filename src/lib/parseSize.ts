import { ImageSize } from '../types';

const parseSize = (size: string): ImageSize | null => {
  const [widthString, heightString] = size.split('x');
  const width = parseInt(widthString, 10);
  const height = parseInt(heightString, 10);

  if (Number.isNaN(width) || Number.isNaN(height)) {
    return null;
  }

  return { width, height };
};

export default parseSize;
