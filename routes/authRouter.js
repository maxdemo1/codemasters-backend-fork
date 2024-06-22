import express from "express";

import validateBody from "../helpers/validateBody.js";
import userServices from "../controllers/authControler.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";
import {auth} from "../middlewares/auth.js"

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(registerSchema), userServices.registerUser);

usersRouter.post("/login", validateBody(loginSchema), userServices.login);

usersRouter.post("/logout/", auth, userServices.logout);

usersRouter.get("/current/", auth, userServices.currentUser);

usersRouter.get("/all", userServices.getAllUsers);
    
export default usersRouter;
