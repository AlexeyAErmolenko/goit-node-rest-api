import express from "express";
const router = express.Router();
router.post("/register", AuthController.register);
export default router;
