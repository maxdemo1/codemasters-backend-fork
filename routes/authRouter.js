import express from "express";

import validateBody from "../helpers/validateBody.js";
import userServices from "../controllers/authControler.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), userServices.registerUser);

usersRouter.post("/login", validateBody(loginSchema), userServices.loginUser);

usersRouter.post("/logout", userServices.logoutUser);
    
export default usersRouter;
