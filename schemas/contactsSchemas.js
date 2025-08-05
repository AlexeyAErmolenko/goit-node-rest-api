import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(5).max(20).required().messages({
    "string.min": "Min 5 characters long.",
    "string.max": "Max 20 characters.",
    "any.required": "Name is required!",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required!",
  }),

  phone: Joi.string().length(10).pattern(/^\d+$/).required().messages({
    "string.length": "Phone must be exactly 10 digits!",
    "string.pattern.base": "Phone only digits!",
    "any.required": "Phone is required!",
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(5).max(20).messages({
    "string.min": "Min 5 characters long.",
    "string.max": "Max 20 characters.",
  }),

  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email address.",
  }),

  phone: Joi.string().length(10).pattern(/^\d+$/).messages({
    "string.length": "Phone must be exactly 10 digits!",
    "string.pattern.base": "Phone only digits!",
  }),
});
