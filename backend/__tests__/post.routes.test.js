
import request from 'supertest';
import app from '../src/server'; // server.js dosyan export edilmiş olmalı
import Post from '../src/models/Post';

describe('POST /api/posts', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 'Test Post', isCompleted: false });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Post');
    expect(res.body.isCompleted).toBe(false);
  });

  it('should update an existing post', async () => {
    const post = await Post.create({ title: 'Test Post', isCompleted: false });
    const res = await request(app)
      .put(`/api/posts/${post._id}`)
      .send({ title: 'Updated Post', isCompleted: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Post');
    expect(res.body.isCompleted).toBe(true);
  });
});