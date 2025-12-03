import { organizationRepository } from "../repositories/organization_repository.js";
import { userRepository } from "../repositories/user_repository.js";

interface CreateUserInput {
  email: string;
  role: "ADMIN" | "CUSTOMER";
  organizationId: string;
}

export class UserService {
  async createUser(input: CreateUserInput) {
    const { email, role, organizationId } = input;

    if (!email) throw new Error("Email is required");
    if (!role) throw new Error("Role is required");
    if (!organizationId) throw new Error("Organization ID is required");

    const org = await organizationRepository.getById(organizationId);
    if (!org) throw new Error("Organization not found");

    // no duplicate user emails allowed
    const existing = await userRepository.getByEmailInOrg(
      organizationId,
      email
    );
    if (existing)
      throw new Error(
        "User with this email already exists in this organization"
      );

    return userRepository.create(input);
  }

  async getUserById(userId: string) {
    const user = await userRepository.getById(userId);
    if (!user) throw new Error("User not found");
    return user;
  }
}

export const userService = new UserService();
