import request from 'supertest';
import { app } from '../boot/server.js';

describe('Like Controller', () => {
  it('should like a post', async () => {
    const response = await request(app)
      .post('/api/v1/likes')
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`)
      .send({
        postId: 'YOUR_POST_ID', // Replace with a valid post ID
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should unlike a post', async () => {
    const response = await request(app)
      .delete('/api/v1/likes/YOUR_LIKE_ID') // Replace with a valid like ID
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
