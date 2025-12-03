import { Router } from "express";

const router = Router();

// Create Organization

router.post("/", async (req, res) => {
  //

  return res
    .status(501)
    .json({ message: "Not implemented: create organization" });
});

// Fetching customers by org

router.get("/:orgId/customers", async (req, res) => {
  //

  return res
    .status(501)
    .json({ message: "Not implemented: fetch customers of organization" });
});

export default router;
