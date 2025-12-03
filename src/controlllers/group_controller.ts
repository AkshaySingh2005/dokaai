import { Request, Response, NextFunction } from "express";
import { groupService } from "../services/group_service.js";

class GroupController {
  async createGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const { organizationId, name } = req.body;

      if (!organizationId) throw new Error("Organization ID is required");
      if (!name) throw new Error("Group name is required");

      const group = await groupService.createGroup({
        organizationId,
        name,
      });

      return res.status(201).json(group);
    } catch (err) {
      next(err);
    }
  }

  async getGroupsWithTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const { orgId } = req.params;

      if (!orgId) throw new Error("Organization ID is required");

      const groups = await groupService.getGroupsWithTopics(orgId);
      return res.json(groups);
    } catch (err) {
      next(err);
    }
  }
}

export const groupController = new GroupController();
