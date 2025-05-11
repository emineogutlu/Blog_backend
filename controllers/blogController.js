const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.user.id });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: 'Blog could not be created.', error: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Blogs could not be retrieved.s', error: err.message });
  }
};

module.exports = { createBlog, getAllBlogs };