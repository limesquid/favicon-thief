import type { Icon } from '../types';

import imageSizeComparator from './imageSizeComparator';

const sortIcons = (icons: Icon[]): Icon[] => {
  return [...icons].sort((icon1, icon2) => imageSizeComparator(icon1.info, icon2.info));
};

export default sortIcons;
