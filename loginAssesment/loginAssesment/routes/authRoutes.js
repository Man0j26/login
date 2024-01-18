import express from 'express';
import { check } from 'express-validator';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', [
  check('name').notEmpty(),
  check('email').isEmail(),
  check('mobile').notEmpty(),
  check('password').isLength({ min: 6 }),
], registerUser);

router.post('/login', loginUser);

export default router;
