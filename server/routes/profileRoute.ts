import express from "express";
import { deleteFavorite, getFavorites, postFavorite } from "../controllers/favoriteController";
import { checkLikeTour, getProfile, getUsersLikedTour, updateProfile, uploadProfileImage } from "../controllers/profileController";
import { asyncHandler } from "../middleware/asyncHandler";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
// Get /user/likedTour/:userId
router.get("/likedTour/:userId", authMiddleware, asyncHandler(getUsersLikedTour));

router.get("/like/:userId/:tourId", authMiddleware, asyncHandler(checkLikeTour));

router.get("/", authMiddleware, asyncHandler(getProfile));
router.put("/", authMiddleware, asyncHandler(updateProfile));
router.post("/profileimage", authMiddleware, asyncHandler(uploadProfileImage));

router.get("/favorite", authMiddleware, asyncHandler(getFavorites));
router.post("/favorite/", authMiddleware, asyncHandler(postFavorite));
router.delete("/favorite/:id", authMiddleware, asyncHandler(deleteFavorite));


export default router;