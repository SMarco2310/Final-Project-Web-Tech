import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validateEmail, validatePassword, getRole } from "../utils/utlis.js";
import AppDataSource from "../config/dataSource.js";
import { UserEntity } from "../models/User.js";
dotenv.config();

// TODO: User Controller
// - Create User
// - Read User
// - Update User
// - Delete User
// - Load Profile
// - Login User

const userRepo = AppDataSource.getRepository(UserEntity);
//  create user

export const registerUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (validateEmail(email) && validatePassword(password)) {
    try {
      const user = await userRepo.findOneBy({
        email: email,
      });
      if (user) {
        return res.status(400).json({
          ok: false,
          status: 400,
          message: "A user with this email already exist",
        });
      }
      const hashed_password = await bcrypt.hash(password, 12);
      const processedRole = getRole(role);

      const newUser = userRepo.create({
        email,
        name,
        password: hashed_password,
        phone,
        role: processedRole,
      });

      await userRepo.save(newUser);

      const token = jwt.sign(
        { user_id: newUser.id, role: processedRole },
        process.env.SECRETE_KEY,
        {
          expiresIn: "7d",
        },

      );
      const userResponse = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      }

      res.status(201).json({
        ok: true,
        token: token,
        user: userResponse,
        status: 201,
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

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userRepo.findOneBy({
      email: email,
    });
    if (!user) {
      console.error("Error:", `User with email: ${email} doesn't exist`);
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "This user doesn't exist",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password); // ADDED await
    if (user && passwordMatch) {
      const user_id = user.id;
      const user_role = getRole(user.role);
      const token = jwt.sign(
        { user_id, role: user_role },
        process.env.SECRETE_KEY,
        {
          expiresIn: "7d",
        },
      );

      const loggedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        bio: user.bio,
        address: user.address,
      }

      res.status(200).json({
        ok: true,
        token: token,
        user: loggedUser,
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

export const getProfile = async (req, res) => {
  const { id } = req.params;

  // Security Check: Ensure authenticated user is accessing their own profile
  if (parseInt(id) !== req.user.user_id) {
    return res.status(403).json({
      ok: false,
      status: 403,
      message: "Unauthorized: You can only view your own profile",
    });
  }

  try {
    const user = await userRepo
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.items", "items")
      .leftJoinAndSelect("user.claims", "claims")
      .where("user.id = :id", { id })
      .select([
        "user.id",
        "user.email",
        "user.name",
        "user.phone",
        "user.bio",
        "user.bio",
        "user.image",
        "user.createdAt",

        "claims",
        "items",
      ])
      .getOne();



    if (user) {
      res.status(200).json({
        ok: true,
        user,
        message: "User profile successfully Loaded!",
      });
    } else {
      res.status(404).json({
        ok: false,
        status: 404,
        message: "User Not Found",
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


export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, bio, image } = req.body;

  // Security Check: Ensure authenticated user is updating their own profile
  if (id !== req.user.user_id) {
    return res.status(403).json({
      ok: false,
      status: 403,
      message: "Unauthorized: You can only update your own profile",
    });
  }

  try {
    const user = await userRepo.findOneBy({ id: id });
    if (!user) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "User Not Found",
      });
    }
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.bio = bio;
    user.address = address;
    user.image = image;
    await userRepo.save(user);
    res.status(200).json({
      ok: true,
      user,
      message: "User profile successfully updated!",
    });
  } catch (err) {
    console.error("Error in updateProfile : ", err);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Server error while updating the user profile",
    });
  }
};
