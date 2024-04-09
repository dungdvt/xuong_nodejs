import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import { registerValidator, loginValidator } from "../validations/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class AuthController {
  // POST auth/register
  async register(req, res) {
    try {
      // validate
      const { error } = registerValidator.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
      const { username, email, password } = req.body;
      // check email co trong db chua findOne
      const emailExisted = await User.findOne({
        email,
      });
      if (emailExisted) {
        return res.status(400).json({
          message: "Email dc dung roi nhe !!!",
        });
      }
      // ma hoa password
      const hashPassword = await bcryptjs.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashPassword,
      });
      res.status(201).json({
        message: "register done",
        data: { ...user.toObject(), password: undefined },
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  // POST auth/login
  async login(req, res) {
    try {
      // validate
      const { error } = loginValidator.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({
          message: errors,
        });
      }
      // check email trong db
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "Tai khoan ko dung",
        });
      }
      // so sanh password: bcryptjs.compare
      const checkPassword = await bcryptjs.compare(password, user.password);
      // ma hoa token
      if (!checkPassword) {
        return res.status(400).json({
          message: "Sai mat khau",
        });
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1w",
      });

      console.log(token);
      res.status(200).json({
        message: "login done",
        data: { ...user.toObject(), password: undefined, token },

      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default AuthController;