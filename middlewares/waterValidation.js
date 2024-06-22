import HttpError from "../helpers/HttpError.js";
import waterValidationSchemas from "../schemas/waterSchemas.js";

const addWaterValidation = (req, res, next) => {
  const { error, _ } = waterValidationSchemas.addWaterSchema.validate({
    ...req.body,
  });
  if (error === undefined) {
    return next();
  }

  next(HttpError(400, error.message));
};

const editWaterValidation = (req, res, next) => {
  const { error, _ } = waterValidationSchemas.editWaterSchema.validate({
    ...req.body,
    id: req.params.id,
  });
  if (error === undefined) {
    return next();
  }

  next(HttpError(400, error.message));
};

const deleteWaterValidation = (req, res, next) => {
  const { error, _ } = waterValidationSchemas.deleteWaterSchema.validate({
    id: req.params.id,
  });

  if (error === undefined) {
    return next();
  }

  next(HttpError(400, error.message));
};

const getByDayValidation = (req, res, next) => {
  const { error, _ } = waterValidationSchemas.getByDay.validate({
    ...req.params,
  });
  if (error === undefined) {
    return next();
  }

  next(HttpError(400, error.message));
};
const getByMonthValidation = (req, res, next) => {
  const { error, _ } = waterValidationSchemas.getByMonth.validate({
    ...req.params,
  });
  if (error === undefined) {
    return next();
  }

  next(HttpError(400, error.message));
};

const waterValidationServices = {
  addWaterValidation,
  editWaterValidation,
  deleteWaterValidation,
  getByDayValidation,
  getByMonthValidation,
};
export default waterValidationServices;
