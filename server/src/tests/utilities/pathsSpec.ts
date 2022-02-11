import * as utils from '../../utilities/paths';

describe('getImagePath', () => {
  it('gets the src image path', () => {
    expect(utils.getUploadedImagePath('test')).toContain(
      '/images/full/test.jpeg'
    );
  });
});

describe('getThumbPath', () => {
  it('gets the output thumb image path', () => {
    const name = 'test';
    expect(utils.getProcessedThumbPath(name)).toContain(
      '/images/thumb/test.jpeg'
    );
  });
});
