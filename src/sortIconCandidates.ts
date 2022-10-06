import compareIcons from './compareIcons';
import { IconCandidate } from './types';

const sortIconCandidates = (iconCandidates: IconCandidate[]): IconCandidate[] => {
  return [...iconCandidates].sort((iconCandidate1, iconCandidate2) =>
    compareIcons(iconCandidate1.info, iconCandidate2.info),
  );
};

export default sortIconCandidates;
