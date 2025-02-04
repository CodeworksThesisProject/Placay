import express from "express";
const router = express.Router();
import { getPointsOfInterest, getDetails } from "../controllers/pointsOfInterestController";
import { autocomplete, getCoordinates } from "../controllers/searchButtonController";

router.get('/autocomplete/:input',autocomplete)
router.get('/details/:placeId',getCoordinates)
router.post('/:cityName', getPointsOfInterest);
router.get('/:point_id', getDetails)


export default router;
