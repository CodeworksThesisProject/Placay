import express from "express";
const router = express.Router();
import { getPointsOfInterest } from "../controllers/pointsOfInterest";

router.post('/city/:cityName', getPointsOfInterest);//send latitude, longitude and radius in body of request

export default router;
