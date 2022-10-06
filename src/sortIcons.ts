import compareIcons from './compareIcons';
import { Icon } from './types';

const sortIcons = (icons: Icon[]): Icon[] => {
  return [...icons].sort((icon1, icon2) => compareIcons(icon1.info, icon2.info));
};

export default sortIcons;
