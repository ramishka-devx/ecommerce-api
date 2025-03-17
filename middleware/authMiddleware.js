import jwt from "jsonwebtoken";
import createError from "http-errors";
import { findUserById } from "../models/user.js";

// 🔹 Authenticate token middleware
export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return next(createError(401, "Unauthorized"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    next(createError(403, "Forbidden: Invalid token"));
  }
};

// 🔹 Protect middleware (for authenticated users)
export const protect = async (req, res, next) => {
  authenticateToken(req, res, async (err) => {
    if (err) return next(err);

    const user = await findUserById(req.user.userId);
    if (!user) return next(createError(404, "User not found"));

    req.user = user;
    next();
  });
};

// 🔹 Admin middleware (for admin users only)
export const admin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return next(createError(403, "Access denied: Admins only"));
  }
  next();
};
