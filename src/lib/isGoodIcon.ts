import { ProbeResult } from 'probe-image-size';

import { DEFAULT_MIN_SIZE, DEFAULT_PREFER_SQUARE } from '../constants';
import type { Options } from '../types';



const isGoodIcon = (result: ProbeResult, options: Options = {}): boolean => {
  const { minSize = DEFAULT_MIN_SIZE, preferSquare = DEFAULT_PREFER_SQUARE } = options;
  const { height, width } = result;
  const isMinSize = width * height >= minSize;

  if (preferSquare) {
    const isSquare = width === height;
    return isSquare && isMinSize;
  }

  return isMinSize;
};

export default isGoodIcon;
