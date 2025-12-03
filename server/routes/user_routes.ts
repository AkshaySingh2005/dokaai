import { Router } from "express";

const router = Router();

// Create User (Admin / Customer)
router.post("/", async (req, res) => {
  //

  return res.status(501).json({ message: "Not implemented: create user" });
});

// Fetch user details
router.get("/:userId", async (req, res) => {
  //

  return res.status(501).json({ message: "Not implemented: fetch user" });
});

export default router;
