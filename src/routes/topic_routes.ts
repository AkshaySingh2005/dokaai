import { Router } from "express";
import { topicController } from "../controlllers/topic_controller.js";
import { verifyAdmin } from "../middlewares/verify_admin.js";

const router = Router();


router.post("/", verifyAdmin, topicController.createTopic);

export default router;
