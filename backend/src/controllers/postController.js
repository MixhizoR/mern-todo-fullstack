import Post from "../models/Post.js";

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().exec();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" });
    }
};

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: "Title is required" });
        const post = new Post({ title });
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update an existing post
export const updatePost = async (req, res) => {
    try {
        const { title } = req.body;
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title },
            { new: true, runValidators: true }
        );
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID or data" });
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" });
    }
};

export const deleteAllPosts = async (req, res) => {
    try {
        await Post.deleteMany();
        res.status(200).json({ message: "All posts deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};