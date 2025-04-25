import * as postController from '../src/controllers/postController.js';
import Post from '../src/models/Post.js';

jest.mock('../src/models/Post.js');

describe('postController', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getAllPosts', () => {
    it('should return all posts', async () => {
      const posts = [{ title: 'test' }];
      Post.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(posts) });

      await postController.getAllPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(posts);
    });

    it('should handle errors', async () => {
      Post.find.mockReturnValue({ exec: jest.fn().mockRejectedValue(new Error('fail')) });

      await postController.getAllPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    });
  });

  describe('getPostById', () => {
    it('should return a post by id', async () => {
      req.params = { id: '1' };
      const post = { title: 'test' };
      Post.findById.mockResolvedValue(post);

      await postController.getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(post);
    });

    it('should return 404 if post not found', async () => {
      req.params = { id: '1' };
      Post.findById.mockResolvedValue(null);

      await postController.getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should handle errors', async () => {
      req.params = { id: '1' };
      Post.findById.mockRejectedValue(new Error('fail'));

      await postController.getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      req.body = { title: 'test' };
      const savedPost = { title: 'test', save: jest.fn().mockResolvedValue() };
      Post.mockImplementation(() => savedPost);

      await postController.createPost(req, res);

      expect(savedPost.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedPost);
    });

    it('should return 400 if title is missing', async () => {
      req.body = {};
      await postController.createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Title is required' });
    });

    it('should handle errors', async () => {
      req.body = { title: 'test' };
      const savedPost = { title: 'test', save: jest.fn().mockRejectedValue(new Error('fail')) };
      Post.mockImplementation(() => savedPost);

      await postController.createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      req.params = { id: '1' };
      req.body = { title: 'updated' };
      const updatedPost = { title: 'updated' };
      Post.findByIdAndUpdate.mockResolvedValue(updatedPost);

      await postController.updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedPost);
    });

    it('should return 404 if post not found', async () => {
      req.params = { id: '1' };
      req.body = { title: 'updated' };
      Post.findByIdAndUpdate.mockResolvedValue(null);

      await postController.updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should handle errors', async () => {
      req.params = { id: '1' };
      req.body = { title: 'updated' };
      Post.findByIdAndUpdate.mockRejectedValue(new Error('fail'));

      await postController.updatePost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID or data' });
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      req.params = { id: '1' };
      const deletedPost = { title: 'deleted' };
      Post.findByIdAndDelete.mockResolvedValue(deletedPost);

      await postController.deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post deleted' });
    });

    it('should return 404 if post not found', async () => {
      req.params = { id: '1' };
      Post.findByIdAndDelete.mockResolvedValue(null);

      await postController.deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });

    it('should handle errors', async () => {
      req.params = { id: '1' };
      Post.findByIdAndDelete.mockRejectedValue(new Error('fail'));

      await postController.deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
    });
  });
});