import type fetch from 'node-fetch';
import type { ProbeResult } from 'probe-image-size';

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

export interface Options {
  init?: Parameters<typeof fetch>[1];
  minSize?: number;
  preferSquare?: boolean;
}
