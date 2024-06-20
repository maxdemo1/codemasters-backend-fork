import Joi from "joi";

const addWaterSchema = Joi.object({
  owner_id: Joi.string().min(2).max(40).required(),
  amount: Joi.number().min(0.05).max(12).required(),
  year: Joi.number().less(2026).required().greater(2022),
  month: Joi.number()
    .less(12)
    .required()
    .greater(0 - 1),
  day: Joi.number().less(32).greater(0).required(),
  time: Joi.string()
    .pattern(
      /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
      "HH:MM:SS format - example 00:16:06"
    )
    .messages({
      "string.pattern.base":
        "Time must be in the format HH:MM:SS - example 00:16:06",
    }),
});

const editWaterSchema = Joi.object({
  owner_id: Joi.string().hex().length(24).required(),
  amount: Joi.number().min(0.05).max(12).required(),
});
const deleteWaterSchema = Joi.object({
  owner_id: Joi.string().hex().length(24).required(),
});
const validateIdSchema = Joi.object({
  _id: Joi.string().hex().length(24).required(),
});

const waterValidationSchemas = {
  addWaterSchema,
  editWaterSchema,
  validateIdSchema,
  deleteWaterSchema,
};

export default waterValidationSchemas;
