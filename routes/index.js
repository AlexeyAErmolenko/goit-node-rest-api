import express from "express";

import contactRouters from "./contacts.js";
import authRouters from "./auth.js";
import userRouters from "./users.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use("/auth", authRouters);
router.use("/contacts", authMiddleware, contactRouters);
router.use("/users", authMiddleware, userRouters);

export default router;
