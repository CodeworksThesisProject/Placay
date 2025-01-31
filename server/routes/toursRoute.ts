import express from "express";
const router = express.Router();
import { getTours, postTours, editTours, deleteTours } from "../controllers/toursController";

router.get('/:user_id', getTours);
router.post('/:user_id', postTours);
router.put('/:tour_id', editTours);
router.delete('/:tour_id', deleteTours);

export default router;