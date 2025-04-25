import mongoose from 'mongoose';
import Post from '../src/models/Post';

describe('Post Model', () => {
  it('should require title field', async () => {
    const post = new Post({});
    let err;
    try {
      await post.validate();
    } catch (error) {
      err = error;
    }
    expect(err.errors.title).toBeDefined();
  });
});