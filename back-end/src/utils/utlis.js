// TODO: Implement utility functions here
// - a function to validate email and password
//

import { Role } from "../models/User.js";
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // this check if the password has 8 characters and at least one uppercase
  // letter, one lowercase letter, one number, and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const getRole = (role) => {
  if (!role || typeof role !== "string" || (!role) in Role) return Role.USER;
  return Role[role.trim().toUpperCase()];
};
