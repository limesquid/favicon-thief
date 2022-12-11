import { Favicon } from '../types';

import unique from './unique';

const createGuessed = (urls: string[]): Favicon[] => {
  return unique(urls).map((url) => ({ sizes: [], source: 'guess', url }));
};

export default createGuessed;
