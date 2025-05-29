import Joi from "joi";

export const depositSchema = Joi.object({
  email: Joi.string().email().required(),
  amount: Joi.number().greater(5).less(999999).required(),
});

export const transferSchema = Joi.object({
  deliverer: Joi.string().email().required(),
  recipient: Joi.string().email().required(),
  amount: Joi.number().greater(5).less(999999).required(),
});

export const withdrawSchema = Joi.object({
  email: Joi.string().email().required(),
  amount: Joi.number().greater(5).less(999999).required(),
});
