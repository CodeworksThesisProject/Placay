import express from "express";
const router = express.Router();
import { getPointsOfInterest, getDetails } from "../controllers/pointsOfInterestController";

router.post('/:cityName', getPointsOfInterest);
router.get('/:point_id', getDetails)

export default router;
