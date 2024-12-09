jest.setTimeout(30000);

import request from 'supertest';
import { app } from '../boot/server.js';
import { jwtToken } from './authController.test.js'; 

describe('Comment Controller', () => {
  let postId;

  beforeAll(async () => {
    console.log('JWT Token (Before All):', jwtToken); 

    const postResponse = await request(app)
      .post('/api/v1/posts')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post content',
      });

    console.log('Post Response:', postResponse.body); 
    postId = postResponse.body.data._id; 
  });

  it('should create a comment', async () => {
    console.log('JWT Token (Create Comment):', jwtToken); 

    const response = await request(app)
      .post('/api/v1/comments')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({
        postId, 
        content: 'This is a test comment',
      });

    console.log('Create Comment Response:', response.body); 
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it('should fetch comments for a post', async () => {
    console.log('JWT Token (Fetch Comments):', jwtToken); 

    const response = await request(app)
      .get(`/api/v1/comments/${postId}`) 
      .set('Authorization', `Bearer ${jwtToken}`);

    console.log('Fetch Comments Response:', response.body); 
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});


