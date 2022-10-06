import { ImageInfo } from '../types';

/**
 * Favors square images, and then large images.
 */
const compareIcons = (imageInfo1: ImageInfo | null, imageInfo2: ImageInfo | null): number => {
  if (imageInfo1 === null && imageInfo2 === null) {
    return 0;
  }

  if (imageInfo1 === null) {
    return 1;
  }

  if (imageInfo2 === null) {
    return -1;
  }

  const image1Size = imageInfo1.width * imageInfo1.height;
  const image2Size = imageInfo2.width * imageInfo2.height;
  const isImage1Square = imageInfo1.width === imageInfo1.height;
  const isImage2Square = imageInfo2.width === imageInfo2.height;

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
