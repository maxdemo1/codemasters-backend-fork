import express from "express";
import { checkToken } from "../middlewares/checkToken.js";
import { addWater } from "../controllers/waterControler.js";
import { addWaterValidation } from "../middlewares/addWaterValidation.js";

const waterRouter = express.Router();

waterRouter.post("/add", addWaterValidation, checkToken, addWater);
export default waterRouter;
