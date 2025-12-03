import { Router } from "express";

const router = Router();

// For a user x , fetch groups + topics + channel preferences
router.get("/user/:userId", async (req, res) => {
  //

  return res
    .status(501)
    .json({ message: "Not implemented: fetch user preferences" });
});

// Setting up the Group preferences true/false
router.put("/group/:groupId/user/:userId", async (req, res) => {
  //

  return res
    .status(501)
    .json({ message: "Not implemented: update group preference" });
});

// Setting up the channel preferences true/false
router.put("/topic/:topicId/user/:userId", async (req, res) => {
  //

  return res
    .status(501)
    .json({ message: "Not implemented: update topic channel preferences" });
});

// Decision
router.post("/decision", async (req, res) => {
  //

  return res.status(501).json({ message: "Not implemented: decision logic" });
});

export default router;
