import { Icon } from '../types';

import compareIcons from './compareIcons';

const sortIcons = (icons: Icon[]): Icon[] => {
  return [...icons].sort((icon1, icon2) => compareIcons(icon1.info, icon2.info));
};

export default sortIcons;
