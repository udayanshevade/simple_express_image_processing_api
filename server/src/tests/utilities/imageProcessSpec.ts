import { promises as fs } from 'fs'
import sizeOf from 'image-size'
import * as utils from '../../utilities/imageProcess'
import * as pathUtils from '../../utilities/paths'

describe('doesFileExist', () => {
  it('identifies an existing file', async () => {
    const fileExists = await utils.doesFileExist(
      pathUtils.getUploadedImagePath('test')
    )
    expect(fileExists).toBe(true)
  })
  it('identifies a non-existing file', async () => {
    const fileExists = await utils.doesFileExist(
      pathUtils.getUploadedImagePath('nonexistent')
    )
    expect(fileExists).toBe(false)
  })
})

describe('getImageIfExists', () => {
  it('gets the image at a specified file path', async () => {
    const image = await utils.getImageIfExists(
      pathUtils.getUploadedImagePath('test')
    )
    expect(image).toBeDefined()
  })
  it('does not get nonexistent image', async () => {
    const image = await utils.getImageIfExists(
      pathUtils.getUploadedImagePath('nonexistent')
    )
    expect(image).toBeNull()
  })
})

describe('processImage', () => {
  const testFilename = 'process_image_util_test_image'

  // setup:
  // create a copied test image
  beforeEach(async () => {
    await fs.cp(
      pathUtils.getUploadedImagePath('test'),
      pathUtils.getUploadedImagePath(testFilename)
    )
  })

  // teardown:
  // remove the new images
  afterEach(async () => {
    await fs.rm(pathUtils.getUploadedImagePath(testFilename))
  })

  it('processes an image', async () => {
    const options = { width: 250, height: 250 }
    const thumbPath = pathUtils.getProcessedThumbPath(testFilename, options)
    await utils.processImage(testFilename, options)
    const image = await utils.getImage(thumbPath)
    expect(image).toBeDefined()
    // eslint-disable-next-line
    expect(sizeOf(image!)).toEqual(jasmine.objectContaining(options))
    await fs.rm(thumbPath)
  })
})
