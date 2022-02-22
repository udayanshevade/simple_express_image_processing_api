import { promises as fs } from 'fs';
import supertest from 'supertest';
import { URLSearchParams } from 'url';
import sizeOf from 'image-size';
import app from '../../../index';
import * as pathUtils from '../../../utilities/paths';

const request = supertest(app);

describe('healthcheck', () => {
  it('returns a 200 when server is up', async () => {
    const res = await request.get('/healthcheck');
    expect(res.status).toBe(200);
  });
});

describe('images router', () => {
  describe('process endpoint', () => {
    it('handles bad request', async () => {
      const res = await request.get('/api/images/process');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('a filename is required');
    });

    it('returns error for nonexistent image', async () => {
      const query = new URLSearchParams({ filename: 'nonexistent' }).toString();
      const res = await request.get(`/api/images/process?${query}`);
      expect(res.status).toBe(404);
      expect(res.body.error).toContain('invalid file: ');
      expect(res.body.error).toContain('/images/full/nonexistent.jpeg');
    });

    it('returns existing image if no dimensions are specified', async () => {
      const query = new URLSearchParams({
        filename: 'test',
      }).toString();
      const res = await request.get(`/api/images/process?${query}`);
      expect(res.status).toBe(200);
      expect(res.type).toBe('image/jpeg');
      expect(sizeOf(res.body)).toEqual(
        jasmine.objectContaining({ height: 1273, width: 1920 })
      );
    });

    describe('returns resized image', () => {
      const testFilename = 'images_route_process_endpoint_test_image';

      beforeEach(async () => {
        await fs.cp(
          pathUtils.getUploadedImagePath('test'),
          pathUtils.getUploadedImagePath(testFilename)
        );
      });

      afterEach(async () => {
        await fs.rm(pathUtils.getUploadedImagePath(testFilename));
      });

      it('if proper dimensions are specified', async () => {
        const query = new URLSearchParams({
          filename: testFilename,
          width: '300',
          height: '300',
        }).toString();

        const res = await request.get(`/api/images/process?${query}`);

        expect(res.status).toBe(200);
        expect(res.type).toBe('image/jpeg');
        expect(sizeOf(res.body)).toEqual(
          jasmine.objectContaining({ height: 300, width: 300 })
        );

        await fs.rm(pathUtils.getProcessedThumbPath(testFilename));
      });
    });
  });
});
