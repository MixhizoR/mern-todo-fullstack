import express from 'express';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, deleteAllPosts } from '../controllers/postController.js';
const router = express.Router();

router.get('/', getAllPosts)
  
router.get('/:id', getPostById)

router.post('/', createPost)

router.put('/:id', updatePost)

router.delete('/:id', deletePost)

router.delete('/', deleteAllPosts)

export default router
