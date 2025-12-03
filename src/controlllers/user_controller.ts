import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user_service.js";

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, role, organizationId } = req.body;

      if (!email) throw new Error("Email is required");
      if (!role) throw new Error("Role is required");
      if (!organizationId) throw new Error("Organization ID is required");

      const user = await userService.createUser({
        email,
        role,
        organizationId,
      });

      return res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;

      if (!userId) throw new Error("User ID is required");

      const user = await userService.getUserById(userId);
      return res.json(user);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
