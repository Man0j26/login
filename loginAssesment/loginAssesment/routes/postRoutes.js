import express from 'express';
import { createPost, allPost, myPost, editPost, deletePost, individualPost } from '../controllers/postController.js';
import { authorize } from '../middleware/Auth.js';

const router = express.Router();

router.get('/allPosts/:id', authorize, allPost)
router.get('/myPosts/:id', authorize, myPost)
router.get('/post/:id/:postId', authorize, individualPost)
router.post('/posts/:userId', authorize, createPost);
router.patch('/posts/:id/:postId', authorize, editPost);
router.delete('/posts/:id/:postId', authorize, deletePost);


export default router;
