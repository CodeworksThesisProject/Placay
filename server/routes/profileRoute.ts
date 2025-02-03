import express from "express";
import { profileMiddleware } from "../middleware/profileMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";
import { getProfile, updateProfile, uploadProfileImage } from "../controllers/profileController";
import { postFavorite, getFavorites, deleteFavorite } from "../controllers/favoriteController";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.get("/", profileMiddleware, asyncHandler(getProfile));
router.put("/", profileMiddleware, asyncHandler(updateProfile));
router.post("/profileimage", profileMiddleware, asyncHandler(uploadProfileImage));

router.get("/favorite", authMiddleware, asyncHandler(getFavorites));
router.post("/favorite/", authMiddleware, asyncHandler(postFavorite));
router.delete("/favorite/:id", authMiddleware, asyncHandler(deleteFavorite));

export default router;