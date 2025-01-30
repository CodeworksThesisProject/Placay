import express from "express";
import { profileMiddleware } from "../middleware/profileMiddleware";
import { getProfile, addFavorite, getFavorites, deleteFavorite } from "../controllers/profileController";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.get("/", profileMiddleware, asyncHandler(getProfile));
router.get("/favorite", profileMiddleware, asyncHandler(getFavorites));
router.post("/favorite", profileMiddleware, asyncHandler(addFavorite));
router.delete("/favorite/:id", profileMiddleware, asyncHandler(deleteFavorite));

export default router;