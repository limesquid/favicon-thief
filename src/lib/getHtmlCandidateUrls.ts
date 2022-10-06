import { URL } from 'url';

import unique from './unique';

const getHtmlCandidateUrls = (url: string): string[] => {
  const urlObject = new URL(url); // throws on invalid url
  const candidateUrls: string[] = [];

  candidateUrls.push(urlObject.origin);

  if (urlObject.port && urlObject.port !== '80') {
    const urlPort80Object = new URL(url);
    urlPort80Object.port = '';
    candidateUrls.push(urlPort80Object.origin);
  }

  if (urlObject.origin + '/' !== urlObject.href) {
    candidateUrls.push(urlObject.href);
  }

  return unique(candidateUrls);
};

export default getHtmlCandidateUrls;
