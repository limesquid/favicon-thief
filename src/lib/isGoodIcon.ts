import { DEFAULT_MIN_SIZE } from '../constants';
import type { Icon, Options } from '../types';

const isGoodIcon = (icon: Icon, options: Pick<Options, 'minSize'> = {}): boolean => {
  const { minSize = DEFAULT_MIN_SIZE } = options;
  const isMinSize = icon.width * icon.height >= minSize;
  const isSquare = icon.width === icon.height;
  return isSquare && isMinSize;
};

export default isGoodIcon;
