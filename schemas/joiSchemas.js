import Joi from "joi";

export const idContactSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[a-f0-9]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Id must be a 24-character hexadecimal string!",
      "any.required": "id is required!",
    }),
});

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
  favorite: Joi.boolean(),
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
  favorite: Joi.boolean(),
});

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean(),
});

export const userSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required!",
  }),

  password: Joi.string().min(3).max(25).required().messages({
    "string.min": "Min 3 characters long.",
    "string.max": "Max 25 characters.",
    "any.required": "Password is required!",
  }),
});

export const verifyMailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address.",
    "any.required": "Error from Joi or other validation library",
  }),
});

export const updateSubscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.only":
        "Subscription must be one of the following values: starter, pro, business.",
      "any.required": "Subscription is required!",
    }),
});
