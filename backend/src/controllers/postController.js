import Post from "../models/Post.js";
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().lean().exec();
    res.status(200).json(posts);
});

export const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid post ID');
    }
    const post = await Post.findById(id).lean().exec();
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }
    res.status(200).json(post);
});

export const createPost = asyncHandler(async (req, res) => {
    const { title, isCompleted } = req.body;
    if (!title) {
        res.status(400);
        throw new Error('Title is required');
    }
    const post = await Post.create({ title, isCompleted });
    res.status(201).json(post);
});

export const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    
    if (!body || typeof body !== 'object') {
        res.status(400);
        throw new Error('Invalid request body');
    }

    const { title, isCompleted } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid post ID');
    }

    const post = await Post.findByIdAndUpdate(
        id,
        { title, isCompleted },
        { new: true, runValidators: true }
    ).lean().exec();

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    res.status(200).json(post);
});

export const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid post ID');
    }
    const post = await Post.findByIdAndDelete(id).lean().exec();
    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }
    res.status(200).json(post);
});

export const deleteAllPosts = asyncHandler(async (req, res) => {
    await Post.deleteMany().exec();
    res.status(200).json({ message: "All posts deleted" });
});