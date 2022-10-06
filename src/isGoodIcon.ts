import { MIN_GOOD_ICON_SIZE } from './constants';
import { ImageInfo } from './types';

const isGoodIcon = (imageInfo: ImageInfo): boolean => {
  const isSquare = imageInfo.width === imageInfo.height;
  const isMinSize = imageInfo.width * imageInfo.height >= MIN_GOOD_ICON_SIZE;

  return isSquare && isMinSize;
};

export default isGoodIcon;
