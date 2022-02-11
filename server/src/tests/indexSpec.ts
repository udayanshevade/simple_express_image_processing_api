import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('healthcheck', () => {
  it('returns a 200 when server is up', async () => {
    const res = await request.get('/healthcheck');
    expect(res.status).toBe(200);
  });
});
