import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/prismaClient.js";

export async function verifyAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, organizationId } = req.body;

    if (!userId || !organizationId) {
      return res
        .status(400)
        .json({ message: "userId and organizationId are required" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.organizationId !== organizationId) {
      return res
        .status(403)
        .json({ message: "User does not belong to this organization" });
    }

    if (user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Only admins can perform this action" });
    }

    next();
  } catch (err) {
    console.error("verifyAdmin middleware error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
