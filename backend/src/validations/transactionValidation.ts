import Joi from "joi";

export const depositSchema = Joi.object({
  email: Joi.string().email().required(),
  amount: Joi.number().greater(5).less(999999).required(),
});
