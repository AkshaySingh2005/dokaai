import { Router } from "express";
import orgRoutes from "./org_routes.js";
import userRoutes from "./user_routes.js";
import groupRoutes from "./group_routes.js";
import topicRoutes from "./topic_routes.js";
import preferenceRoutes from "./preference_routes.js";

const router = Router();

router.use("/orgs", orgRoutes);
router.use("/users", userRoutes);
router.use("/groups", groupRoutes);
router.use("/topics", topicRoutes);
router.use("/preferences", preferenceRoutes);

export default router;
