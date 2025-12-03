import { Router } from "express";
import { organizationController } from "../controlllers/organization_controller.js";


const router = Router();

// Create organization
router.post("/", organizationController.createOrganization);

// Get customers of an organization
router.get("/:orgId/customers", organizationController.getOrganizationCustomers);

export default router;
