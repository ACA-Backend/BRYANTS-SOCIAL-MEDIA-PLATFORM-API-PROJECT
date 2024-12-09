jest.setTimeout(30000);

import request from 'supertest';
import { app } from '../boot/server.js';

let jwtToken; 
let userId;   

describe('Auth Controller', () => {

  //this will run setup before all tests in this file..
  beforeAll(async () => {
    // Register a new user
    const signupResponse = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'username1',
        email: 'ugochukwubryant@gmail.com',
        password: 'a.nice.password',
        dateOfBirth: '2004-03-19' 
      });

    if (signupResponse.status !== 201) {
      throw new Error(`Signup failed with status ${signupResponse.status}`);
    }

    userId = signupResponse.body.data.user._id; 

    // Login to generate a token
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'username1',
        email: 'ugochukwubryant@gmail.com',
        password: 'a.nice.password'
      });

    if (loginResponse.status !== 200) {
      throw new Error(`Login failed with status ${loginResponse.status}`);
    }

    jwtToken = loginResponse.body.data.token; // Storing the token for use in other tests
    console.log('Generated JWT Token:', jwtToken);
  });

  // Test for user registration
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'username2',
        email: 'newuser@example.com',
        password: 'another.password',
        dateOfBirth: '2000-05-12'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty('_id');
  });

  // Test for user login
  it('should login an existing user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'username1',
        email: 'ugochukwubryant@gmail.com',
        password: 'a.nice.password'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('token');
  });

});

export { jwtToken, userId };

