import { Request, Response, NextFunction } from "express";
import { organizationService } from "../services/organization_service.js";

class OrganizationController {
  async createOrganization(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      if (!name) throw new Error("Organization name is required");

      const org = await organizationService.createOrg(name);
      return res.status(201).json(org);
    } catch (err) {
      next(err);
    }
  }

  async getOrganizationCustomers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { orgId } = req.params;

      if (!orgId) throw new Error("Organization ID is required");

      const customers = await organizationService.getCustomers(orgId);
      return res.json(customers);
    } catch (err) {
      next(err);
    }
  }
}

export const organizationController = new OrganizationController();
