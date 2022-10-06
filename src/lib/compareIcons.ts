import { ANY_SIZE } from '../constants';
import { ImageSize } from '../types';

/**
 * Favors square images, and then large images.
 */
const compareIcons = (size1: ImageSize | null, size2: ImageSize | null): number => {
  if (size1 === null && size2 === null) {
    return 0;
  }

  if (size1 === null) {
    return 1;
  }

  if (size2 === null) {
    return -1;
  }

  if (size1 === ANY_SIZE && size2 === ANY_SIZE) {
    return 0;
  }

  if (size1 === ANY_SIZE) {
    return -1;
  }

  if (size2 === ANY_SIZE) {
    return 1;
  }

  const image1Size = size1.width * size1.height;
  const image2Size = size2.width * size2.height;
  const isImage1Square = size1.width === size1.height;
  const isImage2Square = size2.width === size2.height;

  if (isImage1Square && isImage2Square) {
    return image2Size - image1Size;
  }

  if (isImage1Square) {
    return -1;
  }

  if (isImage2Square) {
    return 1;
  }

  return image2Size - image1Size;
};

export default compareIcons;
