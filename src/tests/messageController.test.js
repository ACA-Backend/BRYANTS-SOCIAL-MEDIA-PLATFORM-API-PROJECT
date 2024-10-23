import request from 'supertest';
import { app } from '../boot/server.js';

describe('Message Controller', () => {
  it('should send a message', async () => {
    const response = await request(app)
      .post('/api/v1/messages')
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`)
      .send({
        recipientId: 'RECIPIENT_USER_ID', // Replace with valid user ID
        content: 'Hello!',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should fetch messages', async () => {
    const response = await request(app)
      .get('/api/v1/messages')
      .set('Authorization', `Bearer YOUR_JWT_TOKEN`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
