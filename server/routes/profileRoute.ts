import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getProfile, updateProfile, uploadProfileImage } from "../controllers/profileController";
import { postFavorite, getFavorites, deleteFavorite } from "../controllers/favoriteController";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.get("/", authMiddleware, asyncHandler(getProfile));
router.put("/", authMiddleware, asyncHandler(updateProfile));
router.post("/profileimage", authMiddleware, asyncHandler(uploadProfileImage));

router.get("/favorite", authMiddleware, asyncHandler(getFavorites));
router.post("/favorite/", authMiddleware, asyncHandler(postFavorite));
router.delete("/favorite/:id", authMiddleware, asyncHandler(deleteFavorite));

export default router;