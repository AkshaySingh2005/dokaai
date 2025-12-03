import { Request, Response, NextFunction } from "express";
import { preferenceService } from "../services/preference_service.js";

class PreferenceController {
  async getUserPreferences(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userId) throw new Error("User ID is required");

      const prefs = await preferenceService.getUserPreferences(userId);
      return res.json(prefs);
    } catch (err) {
      next(err);
    }
  }

  async updateGroupPreference(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, groupId } = req.params;
      const { enabled, organizationId } = req.body;

      if (!userId) throw new Error("User ID is required");
      if (!groupId) throw new Error("Group ID is required");
      if (enabled === undefined) throw new Error("Enabled flag is required");
      if (!organizationId) throw new Error("Organization ID is required");

      const pref = await preferenceService.updateGroupPreference({
        userId,
        groupId,
        enabled,
        organizationId,
      });

      return res.json(pref);
    } catch (err) {
      next(err);
    }
  }

  async updateTopicChannelPreference(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, topicId } = req.params;
      const { channel, enabled, organizationId } = req.body;

      if (!userId) throw new Error("User ID is required");
      if (!topicId) throw new Error("Topic ID is required");
      if (!channel) throw new Error("Channel is required");
      if (enabled === undefined) throw new Error("Enabled flag is required");
      if (!organizationId) throw new Error("Organization ID is required");

      const pref = await preferenceService.updateTopicChannelPreference({
        userId,
        topicId,
        channel,
        enabled,
        organizationId,
      });

      return res.json(pref);
    } catch (err) {
      next(err);
    }
  }

  async decision(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, topicId, channel, organizationId } = req.body;

      if (!userId) throw new Error("User ID is required");
      if (!topicId) throw new Error("Topic ID is required");
      if (!channel) throw new Error("Channel is required");
      if (!organizationId) throw new Error("Organization ID is required");

      const result = await preferenceService.decide({
        userId,
        topicId,
        channel,
        organizationId,
      });

      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const preferenceController = new PreferenceController();
