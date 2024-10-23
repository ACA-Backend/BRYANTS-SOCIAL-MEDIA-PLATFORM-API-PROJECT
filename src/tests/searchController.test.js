import request from 'supertest';
import { app } from '../boot/server.js';

describe('Search Controller', () => {
  it('should search users', async () => {
    const response = await request(app)
      .get('/api/v1/search/users?q=test') // Adjust query as needed
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
