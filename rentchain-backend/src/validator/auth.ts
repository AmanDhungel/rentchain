import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().allow("", null),
  role: Joi.string()
    .valid("tenant", "landlord", "agent", "investor")
    .required(),
  password: Joi.string().min(6).max(128).required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
