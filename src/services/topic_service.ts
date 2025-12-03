import { groupRepository } from "../repositories/group_repository.js";
import { organizationRepository } from "../repositories/organization_repository.js";
import { topicRepository } from "../repositories/topic_repository.js";

interface CreateTopicInput {
  name: string;
  groupId: string;
  organizationId: string;
}

export class TopicService {
  async createTopic(input: CreateTopicInput) {
    const { name, groupId, organizationId } = input;

    if (!name) throw new Error("Topic name is required");

    const group = await groupRepository.getById(groupId);
    if (!group) throw new Error("Group not found");

    // Validate org consistency
    if (group.organizationId !== organizationId) {
      throw new Error("Group does not belong to this organization");
    }

    return topicRepository.create(input);
  }
}

export const topicService = new TopicService();
