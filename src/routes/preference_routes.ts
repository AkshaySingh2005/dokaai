import { Router } from "express";
import { preferenceController } from "../controlllers/preference_controller.js";

const router = Router();

// Get all preferences for user
router.get("/user/:userId", preferenceController.getUserPreferences);

// Update group preference
router.put(
  "/group/:groupId/user/:userId",
  preferenceController.updateGroupPreference
);

// Update topic-channel preference
router.put(
  "/topic/:topicId/user/:userId",
  preferenceController.updateTopicChannelPreference
);

// Decision logic
router.post("/decision", preferenceController.decision);

export default router;
