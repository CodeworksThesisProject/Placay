import express from "express";
const router = express.Router();
import { getTours, postTours, editTours, deleteTours } from "../controllers/toursController";

router.get('/:user_id', getTours)
router.post('/:user_id', postTours); //body: title, city, country, duration, locations
router.put('/:tour_id', editTours) //body: _id, user_id, title, city, country, duration, locations
router.delete('/:tour_id', deleteTours)

export default router;