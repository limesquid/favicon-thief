import { FaviconLink } from '../types';

import unique from './unique';

const createGuessedLinks = (urls: string[]): FaviconLink[] => {
  return unique(urls).map((url) => ({ sizes: [], source: 'guess', url }));
};

export default createGuessedLinks;
