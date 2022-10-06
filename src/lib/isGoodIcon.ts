import type { Icon } from '../types';

const isGoodIcon = (icon: Icon, minSize: number): boolean => {
  const isMinSize = icon.width * icon.height >= minSize;
  const isSquare = icon.width === icon.height;
  return isSquare && isMinSize;
};

export default isGoodIcon;
