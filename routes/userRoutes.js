import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔹 Public Routes
router.post('/', registerUser); // Register a new user
router.post('/login', loginUser); // Login user

// 🔹 Protected Routes
router.get('/', protect, admin, getAllUsers); // Get all users (Admin only)
router.get('/:id', protect, getUserById); // Get user by ID
router.put('/:id', protect, updateUser); // Update user
router.delete('/:id', protect, admin, deleteUser); // Delete user (Admin only)

export default router;
