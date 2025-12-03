import { groupRepository } from "../repositories/group_repository.js";
import { organizationRepository } from "../repositories/organization_repository.js";

interface CreateGroupInput {
  organizationId: string;
  name: string;
}

export class GroupService {
  async createGroup(input: CreateGroupInput) {
    const { organizationId, name } = input;

    if (!name) throw new Error("Group name is required");

    const org = await organizationRepository.getById(organizationId);
    if (!org) throw new Error("Organization not found");

    return groupRepository.create(input);
  }

  async getGroupsWithTopics(orgId: string) {
    const org = await organizationRepository.getById(orgId);
    if (!org) throw new Error("Organization not found");

    return groupRepository.getGroupsByOrg(orgId);
  }
}

export const groupService = new GroupService();
