import { Router } from "express";
const authRouter = Router();

import AuthController from "../controllers/auth.js";

const authController = new AuthController();
// routes auth /register
authRouter.post("/register", authController.register);
// routes auth /login
authRouter.post("/login", authController.login);

export default authRouter;