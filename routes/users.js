import express from "express";
import uploadMiddleware from "../middleware/upload.js";
import UserController from "../controllers/user.js";
import authMiddleware from "../middleware/auth.js";
import { verifyMailSchema } from "../schemas/joiSchemas.js";
import { validateBody } from "../helpers/validate.js";

const router = express.Router();

const jsonParserBody = express.json();

router.get("/verify/:verificationToken", UserController.verifyMail);
router.post(
  "/verify",
  jsonParserBody,
  validateBody(verifyMailSchema),
  UserController.resendingVerifyMail
);
router.get("/avatar", authMiddleware, UserController.getAvatar);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  UserController.uploadAvatar
);

export default router;
