import { Candidate } from '../types';

import compareIcons from './compareIcons';

const sortCandidates = (candidates: Candidate[]): Candidate[] => {
  return [...candidates].sort((candidate1, candidate2) => {
    return compareIcons(candidate1.info, candidate2.info);
  });
};

export default sortCandidates;
