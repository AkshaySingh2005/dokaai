import { Router } from "express";
import { topicController } from "../controlllers/topic_controller.js";

const router = Router();

// Create topic inside a group
router.post("/", topicController.createTopic);

export default router;
