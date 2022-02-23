import express, { Request } from 'express'
import {
  doesFileExist,
  getImage,
  getImageIfExists,
  processImage,
  validateOptions,
} from '../../utilities/imageProcess'
import * as pathUtils from '../../utilities/paths'

const imageProcessing = express.Router()

interface ImageResizeQueryParams {
  ext?: string
  filename: string
  width: number
  height: number
}

imageProcessing.get(
  '/',
  async (
    req: Request<
      Record<string, never>,
      Buffer | { error: string },
      never,
      ImageResizeQueryParams
    >,
    res
  ) => {
    const { filename, ext = 'jpeg', ...options } = req.query

    // handle bad request
    if (!filename) {
      return res.status(400).send({ error: 'a filename is required' })
    }

    const srcPath = pathUtils.getUploadedImagePath(filename, ext)
    const srcFileExists = await doesFileExist(srcPath)

    // handle non-existent file
    if (!srcFileExists) {
      console.error(`invalid file: ${srcPath}`)
      return res.status(404).send({ error: `invalid file: ${srcPath}` })
    }

    // just send back the unprocessed image if no target dimensions are provided
    if (!validateOptions(options)) {
      console.log('Invalid options specified, returning src image')
      const unprocessedImage = await getImage(srcPath)

      // unexpected error, file should exist
      if (!unprocessedImage) {
        return res.status(500).send({ error: 'unable to get image' })
      }
      return res.type(ext).send(unprocessedImage)
    }

    const parsedWidth = Number(options.width)
    const parsedHeight = Number(options.height)

    // return error if invalid dimensions are sent
    if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
      console.log(
        `Invalid resize dimensions specified: ${parsedWidth} x ${parsedHeight}`
      )
      return res.status(400).send({ error: 'invalid resize dimensions' })
    }

    // get resized thumb image if it has already been processed
    const outputPath = pathUtils.getProcessedThumbPath(filename, options, ext)
    let image = await getImageIfExists(outputPath)
    if (image) {
      console.log('Returning cached resized image')
      return res.type(ext).send(image)
    }

    console.log(
      `Resizing image ${outputPath} with options: ${JSON.stringify(options)}`
    )
    const parsedOptions = {
      ...options,
      width: parsedWidth,
      height: parsedHeight,
    }
    // or else process and send the new thumb image
    const success = await processImage(filename, parsedOptions, ext)

    // handle processing error
    if (!success) {
      return res
        .status(500)
        .send({ error: 'something went wrong in processing the image' })
    }

    image = await getImage(outputPath)

    if (!image) {
      return res
        .status(500)
        .send({ error: 'something went wrong in processing the image' })
    }

    console.log('sending newly processed image')
    return res.type(ext).send(image)
  }
)

export default imageProcessing
