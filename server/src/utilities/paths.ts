import path from 'path';

const SRC_DIR = 'full';
export const getUploadedImagePath = (filename: string, ext = 'jpeg') =>
  path.join(__dirname, '..', '..', 'images', SRC_DIR, `${filename}.${ext}`);

const OUTPUT_DIR = 'thumb';
export const getProcessedThumbPath = (filename: string, ext = 'jpeg') =>
  path.join(__dirname, '..', '..', 'images', OUTPUT_DIR, `${filename}.${ext}`);
