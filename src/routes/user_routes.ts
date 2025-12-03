import { Router } from "express";
import { userController } from "../controlllers/user_controller.js";

const router = Router();

// Create user
router.post("/", userController.createUser);

// Get user
router.get("/:userId", userController.getUser);

export default router;
