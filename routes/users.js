import express from "express";

import uploadMiddleware from "../middleware/upload.js";
// import resizeAva from "../middleware/resizeAvatar.js";

import UserController from "../controllers/user.js";

const router = express.Router();

router.get("/avatar", UserController.getAvatar);
router.patch(
  "/avatars",
  uploadMiddleware.single("avatar"),
  UserController.uploadAvatar
);

export default router;
