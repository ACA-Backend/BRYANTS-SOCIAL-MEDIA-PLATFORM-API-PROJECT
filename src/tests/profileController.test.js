import request from 'supertest';
import { app } from '../boot/server.js';

describe('Profile Controller', () => {
  it('should get profile information', async () => {
    const response = await request(app)
      .get('/api/v1/profile/YOUR_USER_ID') // Replace with a valid user ID
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
