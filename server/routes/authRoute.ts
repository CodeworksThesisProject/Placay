import express from "express";
import { login, register } from "../controllers/userController";
import { checkAuth } from "../controllers/authController";
import { asyncHandler } from "../middleware/asyncHandler";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/check-auth", authMiddleware, asyncHandler(checkAuth));

export default router;