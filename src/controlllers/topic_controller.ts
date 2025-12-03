import { Request, Response, NextFunction } from "express";
import { topicService } from "../services/topic_service.js";

class TopicController {
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, groupId, organizationId } = req.body;

      if (!name) throw new Error("Topic name is required");
      if (!groupId) throw new Error("Group ID is required");
      if (!organizationId) throw new Error("Organization ID is required");

      const topic = await topicService.createTopic({
        name,
        groupId,
        organizationId,
      });

      return res.status(201).json(topic);
    } catch (err) {
      next(err);
    }
  }
}

export const topicController = new TopicController();
