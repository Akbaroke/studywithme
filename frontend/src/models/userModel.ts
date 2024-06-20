export interface UserModel {
  email: string;
  name: string;
  token?: string | null;
  role: RoleType | null;
  avatar: string | null;
  is_verified: boolean;
  is_email_verification: boolean;
}

export type RoleType = 'ADMIN' | 'TEACHER' | 'STUDENT';
