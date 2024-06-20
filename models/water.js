import Joi from "joi";
const year = new Date().getFullYear();
export const createAddWaterSchema = Joi.object({
  owner_id: Joi.string().min(2).max(40).required(),
  amount: Joi.number().min(0.05).max(12).required(),
  year: Joi.number()
    .less(year + 1)
    .required()
    .greater(year - 1),
  month: Joi.number()
    .less(12)
    .required()
    .greater(0 - 1),
  time: Joi.string()
    .pattern(
      /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
      "HH:MM:SS format - example 00:16:06"
    )
    .messages({
      "string.pattern.base":
        "Time must be in the format HH:MM:SS, e.g., 00:16:06",
    }),
  amount: Joi.number().min(0.1).max(12),
});
