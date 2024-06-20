import Joi from "joi";

export const createAddWaterSchema = Joi.object({
  owner_id: Joi.string().min(2).max(40).required(),
  amount: Joi.number().min(0.05).max(12).required(),
});
// for future
/* owner_id: Joi.string()
    .min(2)
    .max(20)
    .required()
    .pattern(/^[a-zA-Z0-9 ]*$/),
  year: Joi.number()
    .less(year + 1)
    .required()
    .greater(year - 5),
  month: Joi.number()
    .less(month + 1)
    .required()
    .greater(0),
  time: Joi.string()
    .min(6)
    .required()
    .message(
     
    ),
  amount: Joi.number().min(0.1).max(12),*/
