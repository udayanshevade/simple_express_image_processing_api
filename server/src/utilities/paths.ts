import path from 'path'
import { ImageResizeOptions } from './types'

const SRC_DIR = 'full'
export const getUploadedImagePath = (filename: string, ext = 'jpeg') =>
  path.join(__dirname, '..', '..', 'images', SRC_DIR, `${filename}.${ext}`)

// ensure consistent key order
const resizeOptions: (keyof ImageResizeOptions)[] = ['width', 'height']
/**
 * Returns the snake_case format for the options
 * for accessing/storing specific, processed thumbnails
 * @param options
 * @returns e.g. '200_300' (width: 200, height: 300)
 */
export const convertOptionsToSnakeCase = (options: ImageResizeOptions) =>
  resizeOptions.map((opt) => options[opt]).join('_')

const OUTPUT_DIR = 'thumb'
export const getProcessedThumbPath = (
  filename: string,
  options: ImageResizeOptions,
  ext = 'jpeg'
) =>
  path.join(
    __dirname,
    '..',
    '..',
    'images',
    OUTPUT_DIR,
    `${filename}_${convertOptionsToSnakeCase(options)}.${ext}`
  )
