import { ProbeResult } from 'probe-image-size';

export interface ImageInfo {
  height: number;
  width: number;
}

export interface Candidate {
  url: string;
  info: ImageInfo | null;
}

export interface Icon {
  url: string;
  info: ProbeResult;
}
