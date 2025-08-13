import express from "express";

import { validateBody } from "../helpers/validate.js";
import {
  userSchema,
  updateSubscriptionUserSchema,
} from "../schemas/joiSchemas.js";

import AuthController from "../controllers/auth.js";

import authMiddleware from "../middleware/auth.js";

const router = express.Router();

const jsonParserBody = express.json();

router.post(
  "/register",
  jsonParserBody,
  validateBody(userSchema),
  AuthController.register
);
router.post(
  "/login",
  jsonParserBody,
  validateBody(userSchema),
  AuthController.login
);
router.get("/current", authMiddleware, AuthController.current);
router.post("/logout", authMiddleware, AuthController.logout);
router.patch(
  "/",
  jsonParserBody,
  validateBody(updateSubscriptionUserSchema),
  authMiddleware,
  AuthController.updateSubscription
);

export default router;
