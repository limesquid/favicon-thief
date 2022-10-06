import type fetch from 'node-fetch';
import type { ProbeResult } from 'probe-image-size';

import { ANY_SIZE } from './constants';

export type ScalableVectorImageSize = typeof ANY_SIZE;

export interface RasterImageSize {
  height: number;
  width: number;
}

export type ImageSize = ScalableVectorImageSize | RasterImageSize;

export interface Candidate {
  size: ImageSize | null;
  url: string;
}

export interface Icon {
  info: ProbeResult;
  url: string;
}

export interface Options {
  init?: Parameters<typeof fetch>[1];
  minSize?: number;
  preferSquare?: boolean;
}
