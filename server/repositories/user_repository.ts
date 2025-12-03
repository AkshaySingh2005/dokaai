import { prisma } from "../prisma/prismaClient.js";

interface CreateUserInput {
  email: string;
  role: "ADMIN" | "CUSTOMER";
  organizationId: string;
}

export class UserRepository {
  async create(data: CreateUserInput) {
    return prisma.user.create({
      data,
    });
  }

  async getById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async getByEmailInOrg(organizationId: string, email: string) {
    return prisma.user.findUnique({
      where: {
        organizationId_email: { email, organizationId },
      },
    });
  }

  async getManyByOrg(orgId: string) {
    return prisma.user.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: "asc" },
    });
  }
}

export const userRepository = new UserRepository();
