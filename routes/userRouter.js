import express from "express";

import userServices from "../controllers/userControler.js";
import {auth} from "../middlewares/auth.js"

const usersRouter = express.Router();

usersRouter.get("/current", auth, userServices.currentUser);

usersRouter.get("/all", userServices.getAllUsers);
    
export default usersRouter;
