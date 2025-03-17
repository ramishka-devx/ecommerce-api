import createError from 'http-errors';
import {
  registerUserService,
  loginUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
} from '../services/userService.js';

// 🔹 Register a new user
export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// 🔹 Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUserService(email, password);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// 🔹 Get all users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// 🔹 Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserByIdService(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// 🔹 Update user profile
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await updateUserService(userId, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// 🔹 Delete user (Admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await deleteUserService(userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
