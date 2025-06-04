import { Router } from "express";
import { requireAuth } from "../middlewares/requireAuth";
import { getUsersController } from "../controllers/getUsersController";

const router = Router();
router.get("/users", requireAuth, getUsersController);

export default router;