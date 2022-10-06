import { ProbeResult } from 'probe-image-size';

import { DEFAULT_MIN_SIZE } from '../constants';
import type { Options } from '../types';

const isGoodIcon = (result: ProbeResult, options: Pick<Options, 'minSize'> = {}): boolean => {
  const { minSize = DEFAULT_MIN_SIZE } = options;
  const { height, width } = result;
  const isMinSize = width * height >= minSize;
  const isSquare = width === height;
  return isSquare && isMinSize;
};

export default isGoodIcon;
