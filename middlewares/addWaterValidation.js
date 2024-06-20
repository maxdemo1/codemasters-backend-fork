import HttpError from "../helpers/HttpError.js";
import { createAddWaterSchema } from "../models/water.js";

export const addWaterValidation = (req, res, next) => {
  const { error, _ } = createAddWaterSchema.validate({ ...req.body });
  if (error === undefined) {
    return next();
  }
  console.error(error);
  next(HttpError(400, error.message));
};
