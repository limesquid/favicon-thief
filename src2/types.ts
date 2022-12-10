import { ANY_SIZE } from './constants';

export type FaviconLink = {
  sizes: ImageSize[];
  url: string;
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-sizes
 */
export type ImageSize = VectorImageSize | RasterImageSize;

export type VectorImageSize = typeof ANY_SIZE;

export interface RasterImageSize {
  height: number;
  width: number;
}
