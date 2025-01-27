import express from "express";
const router = express.Router();
import { getPointsOfInterest } from "../controllers/pointsOfInterest";

router.post('/city/:name', getPointsOfInterest);

export default router;
