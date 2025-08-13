import express from "express";
import contactRouters from "./contacts.js";
import authRouters from "./auth.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use("/users", authRouters);
router.use("/contacts", authMiddleware, contactRouters);

export default router;
