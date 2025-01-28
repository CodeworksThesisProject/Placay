import { Router } from "express";
import { getUsers, addUser, updateUser, deleteUser, } from "../controllers/adminController";
import { asyncHandler } from "../middleware/asyncHandler";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router = Router();

router.get("/user", adminMiddleware, asyncHandler(getUsers));
router.post("/user", adminMiddleware, asyncHandler(addUser));
router.put("/user/:id", adminMiddleware, asyncHandler(updateUser));
router.delete("/user/:id", adminMiddleware, asyncHandler(deleteUser));

export default router;