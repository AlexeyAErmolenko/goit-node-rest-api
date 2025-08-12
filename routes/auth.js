import express from "express";

import AuthController from "../controllers/auth.js";

const router = express.Router();

const jsonParserBody = express.json();

router.post("/register", jsonParserBody, AuthController.register);
router.post("/login", jsonParserBody, AuthController.login);

export default router;
