import { DEFAULT_MIN_SIZE, DEFAULT_PREFER_SQUARE } from '../constants';
import { ImageInfo, Options } from '../types';

const isGoodIcon = (imageInfo: ImageInfo, options: Options = {}): boolean => {
  const { minSize = DEFAULT_MIN_SIZE, preferSquare = DEFAULT_PREFER_SQUARE } = options;
  const isMinSize = imageInfo.width * imageInfo.height >= minSize;

  if (preferSquare) {
    const isSquare = imageInfo.width === imageInfo.height;
    return isSquare && isMinSize;
  }

  return isMinSize;
};

export default isGoodIcon;
