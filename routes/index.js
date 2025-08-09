import express from "express";
import contactRouters from "./contacts.js";
import authRouters from "./auth.js";

const router = express.Router();

router.use("/auth", authRouters);
router.use("/contacts", contactRouters);

export default router;
