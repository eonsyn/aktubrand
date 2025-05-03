// lib/auth.js
import jwt from 'jsonwebtoken';

export function generateToken(admin) {
  return jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}
