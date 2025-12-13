// TODO: Implement utility functions here
// - a function to validate email and password
//

import { Role } from "../models/User.js";
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Check if length is at least 8
  if (password.length < 8) return false;
  // Check for lowercase, uppercase, and digit. Special char is optional but encouraged.
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  return hasUpperCase && hasLowerCase && hasDigit;
};

export const getRole = (role) => {
  if (!role || typeof role !== "string" || (!role) in Role) return Role.USER;
  return Role[role.trim().toUpperCase()];
};
