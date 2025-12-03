import { Router } from "express";
import { groupController } from "../controlllers/group_controller.js";
import { verifyAdmin } from "../middlewares/verify_admin.js";

const router = Router();

// Create Notification Group
router.post("/", verifyAdmin, groupController.createGroup);

// Get all groups + topics for an org
router.get("/org/:orgId", groupController.getGroupsWithTopics);

export default router;
