
import request from 'supertest';
import app from '../src/server'; // server.js dosyan export edilmiş olmalı

describe('POST /api/posts', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Post');
  });
});