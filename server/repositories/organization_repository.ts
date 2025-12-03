import { prisma } from "../prisma/prismaClient.js";

export class OrganizationRepository {
  async create(name: string) {
    return prisma.organization.create({
      data: { name },
    });
  }

  async getById(orgId: string) {
    return prisma.organization.findUnique({
      where: { id: orgId },
    });
  }

  async getCustomers(orgId: string) {
    return prisma.user.findMany({
      where: {
        organizationId: orgId,
        role: "CUSTOMER",
      },
      orderBy: { createdAt: "asc" },
    });
  }
}

export const organizationRepository = new OrganizationRepository();
