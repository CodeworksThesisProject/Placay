import express from "express";
import { addNewTour, deleteTours, editTours, getAllTours, getTourById, getTours, likedTours, getNumberOfLikes } from "../controllers/tourController";
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
//http://localhost:5173/tour/like/67a38c2509c295f3d2a7eb80/67a38c4f09c295f3d2a7eb8e
//post /tour/liked/:userId/:tourId
router.post('/liked/:userId/:tourId', authMiddleware, asyncHandler(likedTours));

//get /tour/liked/:tourId
router.get('/liked/:tourId', asyncHandler(getNumberOfLikes));

export default router;