import request from 'supertest';
import { app } from '../boot/server.js';

describe('Comment Controller', () => {
  it('should create a comment', async () => {
    const response = await request(app)
      .post('/api/v1/comments')
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`)
      .send({
        postId: 'YOUR_POST_ID', // Replace with a valid post ID
        content: 'This is a test comment',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should fetch comments for a post', async () => {
    const response = await request(app)
      .get('/api/v1/comments/YOUR_POST_ID') // Replace with a valid post ID
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
