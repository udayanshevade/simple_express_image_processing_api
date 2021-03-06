import * as utils from '../../utilities/paths'

describe('getImagePath', () => {
  it('gets the src image path', () => {
    expect(utils.getUploadedImagePath('test')).toMatch(
      /[/\\]+images[/\\]+full[/\\]+test.jpeg/
    )
  })
})

describe('getThumbPath', () => {
  it('gets the output thumb image path', () => {
    const name = 'test'
    const options = { width: 300, height: 300 }
    expect(utils.getProcessedThumbPath(name, options)).toMatch(
      /[/\\]+images[/\\]+thumb[/\\]+test_300_300.jpeg/
    )
  })
})
