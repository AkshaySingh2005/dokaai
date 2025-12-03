import { Channel } from "@prisma/client";
import { prisma } from "../prisma/prismaClient.js";

interface UpsertGroupPrefInput {
  userId: string; // which user
  groupId: string; // which gorup
  enabled: boolean; //whether it's enabled or disabled .
}

interface UpsertTopicChannelInput {
  userId: string; //which user
  topicId: string; //which topic
  channel: Channel; //which channel (email/sms/...)
  enabled: boolean; //whether it's enabled or disabled .
}

export class PreferenceRepository {
  // Set group preference (ON/OFF) for user:
  async upsertGroupPreference(data: UpsertGroupPrefInput) {
    return prisma.groupPreference.upsert({
      // If row exists, update it. If not, create it.
      where: {
        userId_groupId: { userId: data.userId, groupId: data.groupId },
      },
      create: data,
      update: { enabled: data.enabled },
    });
  }

  // Read group preference for user:
  async getGroupPreference(userId: string, groupId: string) {
    return prisma.groupPreference.findUnique({
      where: { userId_groupId: { userId, groupId } },
    });
  }

  // Set topic-channel preference (ON/OFF) for user:
  async upsertTopicChannelPreference(data: UpsertTopicChannelInput) {
    return prisma.topicChannelPreference.upsert({
      where: {
        userId_topicId_channel: {
          userId: data.userId,
          topicId: data.topicId,
          channel: data.channel,
        },
      },
      create: data,
      update: { enabled: data.enabled },
    });
  }

  // Read topic-channel preference:
  async getTopicChannelPreference(
    userId: string,
    topicId: string,
    channel: Channel
  ) {
    return prisma.topicChannelPreference.findUnique({
      where: { userId_topicId_channel: { userId, topicId, channel } },
    });
  }

  // For a user X, fetch the list of the groups and topics with the channel preference setting
  async getUserPreferences(userId: string) {
    return prisma.groupPreference.findMany({
      where: { userId },
      include: {
        group: {
          include: {
            topics: {
              include: {
                topicPreferences: {
                  where: { userId },
                },
              },
            },
          },
        },
      },
    });
  }
}

export const preferenceRepository = new PreferenceRepository();
