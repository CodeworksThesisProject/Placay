import express from "express";
import { addNewTour, deleteTours, editTours, getAllTours, getTourById, getTours } from "../controllers/tourController";
import { asyncHandler } from "../middleware/asyncHandler";
import { authMiddleware } from "../middleware/authMiddleware";
const router = express.Router();

router.get('/tours', asyncHandler(getAllTours));
router.get('/:user_id', authMiddleware, asyncHandler(getTours));
// router.post('/:user_id', authMiddleware, asyncHandler(postTours));
router.post('/:user_id', authMiddleware, asyncHandler(addNewTour));
router.put('/:tour_id', authMiddleware, asyncHandler(editTours));
router.delete('/:tour_id', authMiddleware, asyncHandler(deleteTours));
router.get("/one/:tour_id", authMiddleware, asyncHandler(getTourById));

export default router;