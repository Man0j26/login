import express from 'express';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);

// Add other user-related routes as needed

export default router;
