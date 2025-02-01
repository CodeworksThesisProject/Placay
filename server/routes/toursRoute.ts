import express from "express";
const router = express.Router();
import { asyncHandler } from "../middleware/asyncHandler";
import { authMiddleware } from "../middleware/authMiddleware";
import { getTours, postTours, editTours, deleteTours, getTourById } from "../controllers/toursController";

router.get('/:user_id', authMiddleware, asyncHandler(getTours));
router.post('/:user_id', authMiddleware, asyncHandler(postTours));
router.put('/:tour_id', authMiddleware, asyncHandler(editTours));
router.delete('/:tour_id', authMiddleware, asyncHandler(deleteTours));
router.get("/one/:tour_id", authMiddleware, asyncHandler(getTourById));

export default router;