import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Role } from "../utils/utlis.js";
import { validateEmail, validatePassword, getRole } from "../utils/utlis.js";

dotenv.config();

// TODO: User Controller
// - Create User
// - Read User
// - Update User
// - Delete User
// - Load Profile
// - Login User

//  create user

const registerUser = async (req, res) => {
  const { name, email, student_id, password, phone, role } = req.body;
  if (validateEmail(email) && validatePassword(password)) {
    const hashed_password = await bcrypt.hash(password, 12);
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        return res.status(400).json({
          ok: false,
          status: 400,
          message: "A user with this email already exist",
        });
      }
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          student_id,
          password: hashed_password,
          phone,
          role: getRole(role),
        },
      });
      const user_id = newUser.id;
      const token = jwt.sign({ user_id, role }, process.env.SECRET_KEY);

      res.status(200).json({
        ok: true,
        token: token,
        user_id: user_id,
        status: 200,
        message: "new user created successfully!!",
      });
    } catch (err) {
      console.error("Error in create_user: ", err);
      res.status(500).json({
        ok: false,
        status: 500,
        message: "Server error while creating new user",
      });
    }
  } else {
    res.status(400).json({
      ok: false,
      status: 400,
      message: "The password or email are not valid",
    });
  }
};

//  Login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      console.log("Error:", `User with email: ${email} doesn't exist`);
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "This user doesn't exist",
      });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const user_id = user.id;
      const user_role = getRole(user.role);
      const token = jwt.sign(
        { user_id, role: user_role },
        process.env.SECRET_KEY,
      );
      res.status(200).json({
        ok: true,
        token: token,
        user_id: user_id,
        status: 200,
        message: "User logged in successfully!!",
      });
    } else {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.error("Error :", err);
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Server error while logging the user in",
    });
  }
};

//  Load Profile

const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      includes: {
        items: true,
        claims: true,
      },
    });
    if (user) {
      res.status(200).json({
        ok: true,
        data: {
          email: user.email,
          name: user.name,
          student_id: user.student_id,
          phone: user.phone,
          items: user.items,
          claims: user.claims,
          created_at: user.created_at,
        },
        message: "User profile successfully Loaded!",
      });
    } else {
      res.status(400 || 403).json({
        ok: false,
        status: 400 || 403,
        message: "Bad Request" || "Unauthorized Request",
      });
    }
  } catch (err) {
    console.error("Error in getProfile : ", err);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Server error while loading the user profile",
    });
  }
};

export default { registerUser, loginUser, getProfile };
