import type { Icon } from '../types';

import imageSizeComparator from './imageSizeComparator';

const sortIcons = (icons: Icon[]): Icon[] => {
  return [...icons].sort(imageSizeComparator);
};

export default sortIcons;
