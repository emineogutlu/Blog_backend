const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs } = require('../controllers/blogController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, createBlog);
router.get('/', getAllBlogs);

module.exports = router;