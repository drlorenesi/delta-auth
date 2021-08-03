const request = require('supertest');
const app = require('../../app');

describe('API point /', () => {
  describe('GET /', () => {
    it('- should return a 200 server response', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  });
});
