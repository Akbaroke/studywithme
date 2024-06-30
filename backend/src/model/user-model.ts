import { User } from '@prisma/client';

export type UserResponse = {
  id: string;
  email: string;
  name: string;
  token?: string | null;
  role: string;
  avatar: string | null;
  is_verified: boolean;
  is_email_verification: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type CreateUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  name?: string;
  password?: string;
  newPassword?: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    is_verified: user.is_verified,
    is_email_verification: user.is_email_verification,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
