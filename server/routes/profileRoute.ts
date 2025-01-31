import express from "express";
import { profileMiddleware } from "../middleware/profileMiddleware";
import { getProfile, updateProfile, uploadProfileImage, addFavorite, getFavorites, deleteFavorite, getTimeperiod, addTimeperiod, deleteTimePeriod } from "../controllers/profileController";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.get("/", profileMiddleware, asyncHandler(getProfile));
router.put("/", profileMiddleware, asyncHandler(updateProfile));
router.post("/image", profileMiddleware, asyncHandler(uploadProfileImage));
router.get("/favorite", profileMiddleware, asyncHandler(getFavorites));
router.post("/favorite", profileMiddleware, asyncHandler(addFavorite));
router.delete("/favorite/:id", profileMiddleware, asyncHandler(deleteFavorite));
router.get("/timeperiod", profileMiddleware, asyncHandler(getTimeperiod));
router.post("/timeperiod", profileMiddleware, asyncHandler(addTimeperiod));
router.delete("/timeperiod/:id", profileMiddleware, asyncHandler(deleteTimePeriod));

export default router;