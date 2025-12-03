import { Router } from "express";

const router = Router();

// Create topic in a group under an org
router.post("/", async (req, res) => {
  //
  return res.status(501).json({ message: "Not implemented: create topic" });
});

export default router;
