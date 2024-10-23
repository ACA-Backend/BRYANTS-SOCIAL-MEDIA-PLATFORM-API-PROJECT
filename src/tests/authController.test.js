import request from 'supertest';
import { app } from '../boot/server.js'; 

describe('Auth Controller', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'username1',
        email: 'email@example.com',
        password: 'a.nice.password'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'username1',
        password: 'a.nice.password'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
