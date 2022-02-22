import { constants as fsConstants, promises as fs } from 'fs'
import sharp from 'sharp'
import * as pathUtils from './paths'
import { ImageResizeOptions } from './types'

/**
 * Processes the source image and outputs the expected image in the images output folder
 * @param filename - name of the image file
 * @param options - processing options, e.g. width and height
 * @returns success
 */
export const processImage = async (
  filename: string,
  options: ImageResizeOptions,
  ext = 'jpeg'
) => {
  const { width, height } = options

  try {
    const srcPath = pathUtils.getUploadedImagePath(filename, ext)
    const outputPath = pathUtils.getProcessedThumbPath(filename, options, ext)
    const image = await fs.readFile(srcPath)

    await sharp(image).resize(width, height).toFile(outputPath)

    return true
  } catch (err) {
    console.error(
      `Unable to process image ${filename}.${ext} with options: ${JSON.stringify(
        options
      )}`,
      err
    )
    return false
  }
}

/**
 * Utility to check if the file exists or not
 * @param filepath - path to the file
 * @returns fileExists
 */
export const doesFileExist = async (filepath: string) => {
  try {
    await fs.access(filepath, fsConstants.F_OK)
    return true
  } catch (err) {
    return false
  }
}

/**
 * Gets the image if it exists or null if not found
 * @param filepath - path to the file
 * @returns image | null
 */
export const getImage = async (filepath: string) => {
  try {
    const image = await fs.readFile(filepath)
    return image
  } catch (err) {
    console.error(`Unable to get image ${filepath}`, err)
    return null
  }
}

/**
 * Wrapper which optionally gets the file if it exists
 * @param filepath - path to the file
 * @returns image | null
 */
export const getImageIfExists = async (filepath: string) => {
  const fileExists = doesFileExist(filepath)
  if (!fileExists) return null
  return getImage(filepath)
}
