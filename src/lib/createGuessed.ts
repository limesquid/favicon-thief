import { Favicon } from '../types';

import unique from './unique';

const createGuessed = (urls: string[], knownFavicons: Favicon[] = []): Favicon[] => {
  const knownUrls = knownFavicons.map((favicon) => favicon.url);

  return unique(urls)
    .filter((url) => !knownUrls.includes(url))
    .map((url) => ({ sizes: [], source: 'guess', url }));
};

export default createGuessed;
