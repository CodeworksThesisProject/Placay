import express from "express";
import { profileMiddleware } from "../middleware/profileMiddleware";
import { getProfile } from "../controllers/profileController";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.get("/", profileMiddleware, asyncHandler(getProfile));

export default router;