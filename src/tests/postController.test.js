import request from 'supertest';
import { app } from '../boot/server.js'; 

describe('Post Controller', () => {
  it('should create a new post', async () => {
    const response = await request(app)
      .post('/api/v1/posts')
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`) // Replace with valid token
      .send({
        title: 'Test Post',
        content: 'This is a test post content',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should fetch all posts', async () => {
    const response = await request(app)
      .get('/api/v1/posts')
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
