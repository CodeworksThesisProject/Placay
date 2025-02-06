import { Router } from "express";
import { getPhoto } from "../controllers/GoogleController";

const router = Router();

router.get("/photo", getPhoto);

export default router;