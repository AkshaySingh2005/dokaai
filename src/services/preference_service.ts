import { preferenceRepository } from "../repositories/preference_repository.js";
import { groupRepository } from "../repositories/group_repository.js";
import { organizationRepository } from "../repositories/organization_repository.js";
import { topicRepository } from "../repositories/topic_repository.js";
import { userRepository } from "../repositories/user_repository.js";
import { Channel } from "@prisma/client";

interface UpdateGroupPrefInput {
  userId: string;
  groupId: string;
  enabled: boolean;
}

interface UpdateTopicChannelInput {
  userId: string;
  topicId: string;
  channel: Channel;
  enabled: boolean;
}

interface DecisionInput {
  userId: string;
  topicId: string;
  channel: Channel;
  organizationId: string;
}

export class PreferenceService {
  //Validations

  async validateUserInOrg(userId: string, organizationId: string) {
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    if (user.organizationId !== organizationId) {
      throw new Error("User does not belong to this organization");
    }
    return user;
  }

  async validateGroup(groupId: string, organizationId: string) {
    const group = await groupRepository.getById(groupId);
    if (!group) throw new Error("Group not found");
    if (group.organizationId !== organizationId) {
      throw new Error("Group does not belong to this organization");
    }
    return group;
  }

  async validateTopic(topicId: string, organizationId: string) {
    const topic = await topicRepository.getById(topicId);
    if (!topic) throw new Error("Topic not found");
    if (topic.organizationId !== organizationId) {
      throw new Error("Topic does not belong to this organization");
    }
    return topic;
  }

  // Group preference

  async updateGroupPreference(
    input: UpdateGroupPrefInput & { organizationId: string }
  ) {
    const { userId, groupId, enabled, organizationId } = input;

    await this.validateUserInOrg(userId, organizationId);

    await this.validateGroup(groupId, organizationId);

    return preferenceRepository.upsertGroupPreference({
      userId,
      groupId,
      enabled,
    });
  }

  // Topic preference

  async updateTopicChannelPreference(
    input: UpdateTopicChannelInput & { organizationId: string }
  ) {
    const { userId, topicId, channel, enabled, organizationId } = input;

    await this.validateUserInOrg(userId, organizationId);

    const topic = await this.validateTopic(topicId, organizationId);

    if (!topic.groupId) {
      throw new Error("Topic is not assigned to a group");
    }

    return preferenceRepository.upsertTopicChannelPreference({
      userId,
      topicId,
      channel,
      enabled,
    });
  }

  // Fetch user preference

  async getUserPreferences(userId: string) {
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");

    return preferenceRepository.getUserPreferences(userId);
  }

  // Decision logic

  async decide(input: DecisionInput) {
    const { userId, topicId, channel, organizationId } = input;

    const user = await this.validateUserInOrg(userId, organizationId);
    const topic = await this.validateTopic(topicId, organizationId);
    const group = await groupRepository.getById(topic.groupId);

    if (!group) {
      throw new Error("Group for this topic not found");
    }

    // 1: Check Group Preference
    const groupPref = await preferenceRepository.getGroupPreference(
      userId,
      group.id
    );

    if (groupPref && groupPref.enabled === false) {
      return { allowed: false };
    }

    //2: Check Topic-Channel Preference
    const channelPref = await preferenceRepository.getTopicChannelPreference(
      userId,
      topicId,
      channel
    );

    if (!channelPref || channelPref.enabled === false) {
      return { allowed: false };
    }

    // 3 : Passed all checks → allowed
    return { allowed: true };
  }
}

export const preferenceService = new PreferenceService();
