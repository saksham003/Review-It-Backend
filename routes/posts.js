import express from 'express';

import { getPosts, getTags, getPost, commentPost, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/tags', getTags);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/comments', auth, commentPost);

export default router;
