import HttpError from "../helpers/HttpError.js";
import waterValidationSchemas from "../validation/water.js";
// ID користувача в req.body з'являється в мідлварі для перевірки токена
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
  });
  const { error: idError, _: __ } =
    waterValidationSchemas.validateIdSchema.validate({
      _id: req.params._id,
    });

  if (error === undefined && idError === undefined) {
    return next();
  }

  if (error !== undefined) {
    next(HttpError(400, error.message));
  } else if (idError !== undefined) {
    next(HttpError(400, idError.message));
  } else {
    next(HttpError(500, "Unknown error"));
  }
};

const deleteWaterValidation = (req, res, next) => {
  const { error, _ } = waterValidationSchemas.deleteWaterSchema.validate({
    ...req.body,
  });
  const { error: idError, _: __ } =
    waterValidationSchemas.validateIdSchema.validate({
      _id: req.params._id,
    });

  if (error === undefined && idError === undefined) {
    return next();
  }

  if (error !== undefined) {
    next(HttpError(400, error.message));
  } else if (idError !== undefined) {
    next(HttpError(400, idError.message));
  } else {
    next(HttpError(500, "Unknown error"));
  }
};

const waterValidationServices = {
  addWaterValidation,
  editWaterValidation,
  deleteWaterValidation,
};
export default waterValidationServices;
