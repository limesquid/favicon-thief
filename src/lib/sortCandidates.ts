import type { Candidate } from '../types';

import imageSizeComparator from './imageSizeComparator';

const sortCandidates = (candidates: Candidate[]): Candidate[] => {
  return [...candidates].sort((candidate1, candidate2) => {
    return imageSizeComparator(candidate1.size, candidate2.size);
  });
};

export default sortCandidates;
