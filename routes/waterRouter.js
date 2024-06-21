import express from "express";
import { checkToken } from "../middlewares/checkToken.js";

import waterServices from "../controllers/waterControler.js";
import waterValidationServices from "../middlewares/waterValidation.js";

const waterRouter = express.Router();

waterRouter.post(
  "/add",
  checkToken,
  waterValidationServices.addWaterValidation,
  waterServices.addWaterServing
);
waterRouter.patch(
  "/edit/:_id",
  checkToken,
  waterValidationServices.editWaterValidation,
  waterServices.editWaterServing
);

waterRouter.delete(
  "/delete/:_id",
  checkToken,
  waterValidationServices.deleteWaterValidation,
  waterServices.deleteWaterServing
);

waterRouter.get(
  "/consumption_day/:day/month/:month/year/:year/",
  checkToken,
  waterValidationServices.getByDayValidation,
  waterServices.waterConsumptionByDay
);

waterRouter.get(
  "/consumption_month/:month/year/:year/",
  checkToken,
  waterValidationServices.getByMonthValidation,
  waterServices.waterConsumptionByMonth
);

export default waterRouter;
