import { Router } from "express";

import orgRoutes from "../routes/org_routes.js";
import userRoutes from "../routes/user_routes.js";
import groupRoutes from "../routes/group_routes.js";
import topicRoutes from "../routes/topic_routes.js";
import preferenceRoutes from "../routes/preference_routes.js";

const router = Router();

router.use("/orgs", orgRoutes);
router.use("/users", userRoutes);
router.use("/groups", groupRoutes);
router.use("/topics", topicRoutes);
router.use("/preferences", preferenceRoutes);

export default router;
