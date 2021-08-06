const request = require('supertest');
const app = require('../../app');

describe('API - "/"', () => {
  describe('GET /', () => {
    it('- código de respuesta del servidor debería de ser 200', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  });
});
