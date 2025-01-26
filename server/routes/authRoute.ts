import express from "express";
import { login, register } from "../controllers/userController";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));


export default router;
