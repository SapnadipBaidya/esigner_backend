import { signToken, verifyToken } from '../utils/jwt.util.js';

export const createMagicLink = ({ templateId, contractId, userId,role }) => {
  const token = signToken({ templateId, contractId, userId , role}, '1d');
  return `${process.env.UI_URL}/fill?token=${token}`;
};

export const verifyMagicLink = (token) => {
  try {
    return { valid: true, data: verifyToken(token) };
  } catch (err) {
    return { valid: false, expired: err.name === 'TokenExpiredError' };
  }
};
