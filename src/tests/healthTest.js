import request from 'supertest';
import { app } from '../boot/server.js'; 

describe('test that the server is up', () => {
    it('should show that the server is up and running', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            success: true,
            message: "the server is up and running",
        })
    });
});
