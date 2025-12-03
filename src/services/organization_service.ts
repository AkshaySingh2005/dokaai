import { organizationRepository } from "../repositories/organization_repository.js";
import { userRepository } from "../repositories/user_repository.js";

export class OrganizationService {
  // Create organization
  async createOrg(name: string) {
    if (!name || name.trim() === "") {
      throw new Error("Organization name is required");
    }
    return organizationRepository.create(name);
  }

  // Get organization by ID
  async getOrg(orgId: string) {
    const org = await organizationRepository.getById(orgId);
    if (!org) throw new Error("Organization not found");
    return org;
  }

  // Get customers for organization
  async getCustomers(orgId: string) {
    const org = await organizationRepository.getById(orgId);
    if (!org) throw new Error("Organization not found");

    return userRepository.getManyByOrg(orgId);
  }
}

export const organizationService = new OrganizationService();
