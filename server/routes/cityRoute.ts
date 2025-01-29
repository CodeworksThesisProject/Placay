import express from "express";
const router = express.Router();
import { getPointsOfInterest } from "../controllers/pointsOfInterestController";
import { getDetails } from "../controllers/pointsOfInterestController";

router.post('/:cityName', getPointsOfInterest);//send latitude, longitude and radius in body of request
router.get('/:point_id', getDetails)

export default router;
