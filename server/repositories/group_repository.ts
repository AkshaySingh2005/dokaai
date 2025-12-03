import { prisma } from "../prisma/prismaClient.js";

interface CreateGroupInput {
  organizationId: string;
  name: string;
}

export class GroupRepository {
  
    async create(data: CreateGroupInput) {
    return prisma.notificationGroup.create({
      data,
    });
  }

  async getById(groupId: string) {
    return prisma.notificationGroup.findUnique({
      where: { id: groupId },
    });
  }

  async getGroupsByOrg(orgId: string) {
    return prisma.notificationGroup.findMany({
      where: { organizationId: orgId },
      include: {
        topics: true,
      },
      orderBy: { createdAt: "asc" },
    });
  }
}

export const groupRepository = new GroupRepository();
