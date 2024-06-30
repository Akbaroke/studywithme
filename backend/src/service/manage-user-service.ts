import { prismaClient } from '../application/database';
import { UserResponse } from '../model/user-model';
import { ValidatedManageUserData } from '../validation/manage-user-validation';

export class ManageUserService {
  static async updateUser(id: string, data: ValidatedManageUserData) {
    return await prismaClient.user.update({
      where: { id },
      data,
    });
  }

  static async getAllUsers() {
    const users = await prismaClient.user.findMany();

    return users.map((value) => ({
      id: value.id,
      email: value.email,
      name: value.name,
      avatar: value.avatar,
      is_verified: value.is_verified,
      is_premium: value.is_premium,
      is_banned: value.is_banned,
      pemium_start_at: value.pemium_start_at,
      pemium_expired_at: value.pemium_expired_at,
      role: value.role,
      created_at: value.created_at,
      updated_at: value.updated_at,
    }));
  }

  static async getUserById(id: string): Promise<UserResponse | null> {
    return await prismaClient.user.findUnique({
      where: { id },
    });
  }
}
