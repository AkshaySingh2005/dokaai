import { prisma } from "../prisma/prismaClient.js";

interface CreateTopicInput {
  name: string;
  groupId: string;
  organizationId: string;
}

export class TopicRepository {
  async create(data: CreateTopicInput) {
    return prisma.notificationTopic.create({
      data,
    });
  }

  async getById(topicId: string) {
    return prisma.notificationTopic.findUnique({
      where: { id: topicId },
    });
  }

  async getTopicsByGroup(groupId: string) {
    return prisma.notificationTopic.findMany({
      where: { groupId },
      orderBy: { createdAt: "asc" },
    });
  }
}

export const topicRepository = new TopicRepository();
