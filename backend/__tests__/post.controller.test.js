import { createPost } from '../src/controllers/postController';
import Post from '../src/models/Post';

jest.mock('../src/models/Post');

describe('Post Controller', () => {
  it('should create a post successfully', async () => {
    const req = { body: { title: 'Test Post' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Post.create.mockResolvedValue({ _id: '1', title: 'Test Post' });

    await createPost(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: '1', title: 'Test Post' });
  });

  // Diğer controller fonksiyonları için benzer şekilde testler yazabilirsin.
});