import { Router } from "express";

const router = Router();

// create group under an organization
router.post("/", async (req, res) => {
  //

  return res.status(501).json({ message: "Not implemented: create group" });
});

// Fetch all groups + topics
router.get("/org/:orgId", async (req, res) => {
  //

  return res
    .status(501)
    .json({ message: "Not implemented: fetch groups + topics for org" });
});

export default router;
