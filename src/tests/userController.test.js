import request from 'supertest';
import { app } from '../boot/server.js';

describe('User Controller', () => {
  it('should get user profile', async () => {
    const response = await request(app)
      .get('/api/v1/users/YOUR_USER_ID') 
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should update user information', async () => {
    const response = await request(app)
      .put('/api/v1/users/YOUR_USER_ID') // Replace with a valid user ID
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`)
      .send({
        username: 'updateduser',
        email: 'updated@example.com',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
