import pool from '../config/db.js';

// 🔹 Find a user by email
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // Return user object or undefined
};

// 🔹 Find a user by ID
export const findUserById = async (userId) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE userId = ?', [userId]);
  return rows[0]; // Return user object or undefined
};

// 🔹 Create a new user
export const createUser = async (firstName, lastName, phone, email, passwordHash, address, city, isAdmin) => {
  const [result] = await pool.query(
    `INSERT INTO users (firstName, lastName, phone, email, password_hash, address, city, isAdmin) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, phone, email, passwordHash, address, city, isAdmin]
  );
  return result.insertId; // Return newly created user ID
};

// 🔹 Get all users (optional: for admin panel)
export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT userId, firstName, lastName, email, phone, city, isAdmin FROM users');
  return rows;
};

// 🔹 Update user details (except password)
export const updateUser = async (userId, firstName, lastName, phone, address, city) => {
  const [result] = await pool.query(
    `UPDATE users 
     SET firstName = ?, lastName = ?, phone = ?, address = ?, city = ?
     WHERE userId = ?`,
    [firstName, lastName, phone, address, city, userId]
  );
  return result.affectedRows; // Return number of affected rows
};

// 🔹 Delete user (soft delete approach recommended)
export const deleteUser = async (userId) => {
  const [result] = await pool.query('DELETE FROM users WHERE userId = ?', [userId]);
  return result.affectedRows; // Return number of affected rows
};
