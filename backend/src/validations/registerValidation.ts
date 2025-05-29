import Joi from "joi";

export default Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(/[0-9]{10,}/),
  password: Joi.string().min(6),
});
