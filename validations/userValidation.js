import Joi from 'joi';

// 🔹 User Registration Schema
export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.pattern.base': 'Phone number must be 10 digits'
  }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  isAdmin: Joi.boolean().default(false)
});

// 🔹 User Login Schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// 🔹 User Update Schema
export const updateSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional().messages({
    'string.pattern.base': 'Phone number must be 10 digits'
  }),
  address: Joi.string().optional(),
  city: Joi.string().optional()
});
