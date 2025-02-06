import express from "express";
const router = express.Router();
import { getPointsOfInterest, getDetails } from "../controllers/pointsOfInterestController";
import { autocomplete, getCoordinates } from "../controllers/searchButtonController";

router.post('/:cityName', getPointsOfInterest);
router.get('/:point_id', getDetails)
router.get('/autocomplete/:input',autocomplete)
router.get('/details/:placeId',getCoordinates)

export default router;
