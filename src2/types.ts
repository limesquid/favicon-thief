import { ANY_SIZE } from './constants';

export type FaviconLink = {
  sizes: ImageSize[];
  url: string;
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-sizes
 */
export type ImageSize =
  | typeof ANY_SIZE
  | {
      height: number;
      width: number;
    };
