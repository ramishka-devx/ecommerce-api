import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import {
  findUserByEmail,
  findUserById,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} from '../models/user.js';
import { generateToken } from '../utils/jwt.js';
import { registerSchema, loginSchema, updateSchema } from '../validations/userValidation.js';

// 🔹 Register a New User
export const registerUserService = async (userData) => {
  const { error, value } = registerSchema.validate(userData);
  if (error) throw createError(400, error.details[0].message);

  const { firstName, lastName, phone, email, password, address, city, isAdmin } = value;

  const existingUser = await findUserByEmail(email);
  if (existingUser) throw createError(409, 'User already exists');

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await createUser(firstName, lastName, phone, email, passwordHash, address, city, isAdmin);

  return {
    message: 'User registered successfully',
    userId,
    token: generateToken(userId),
  };
};

// 🔹 Login User
export const loginUserService = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw createError(400, error.details[0].message);

  const user = await findUserByEmail(email);
  if (!user) throw createError(401, 'Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw createError(401, 'Invalid credentials');

  return {
    message: 'Login successful',
    userId: user.userId,
    token: generateToken(user.userId),
  };
};

// 🔹 Get all users (for admin panel)
export const getAllUsersService = async () => {
  return await getAllUsers();
};

// 🔹 Get user by ID
export const getUserByIdService = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw createError(404, 'User not found');
  }
  return user;
};

// 🔹 Update User
export const updateUserService = async (userId, updateData) => {
  const { error, value } = updateSchema.validate(updateData);
  if (error) throw createError(400, error.details[0].message);

  const { firstName, lastName, phone, address, city } = value;
  const affectedRows = await updateUser(userId, firstName, lastName, phone, address, city);

  if (affectedRows === 0) throw createError(404, 'User not found or no changes made');

  return { message: 'User updated successfully' };
};

// 🔹 Delete user
export const deleteUserService = async (userId) => {
  const affectedRows = await deleteUser(userId);
  if (affectedRows === 0) {
    throw createError(404, 'User not found');
  }

  return { message: 'User deleted successfully' };
};
