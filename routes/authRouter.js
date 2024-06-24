import express from "express";

import validateBody from "../helpers/validateBody.js";
import authServices from "../controllers/authControler.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";
import {auth} from "../middlewares/auth.js"

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), authServices.registerUser);

usersRouter.post("/login", validateBody(loginSchema), authServices.login);

usersRouter.post("/logout", auth, authServices.logout);

usersRouter.post("/refresh", auth, authServices.refreshToken);

export default usersRouter;
