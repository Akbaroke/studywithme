export interface UserModel {
  id?: string;
  email: string;
  name: string;
  token?: string | null;
  role: RoleType | null;
  avatar: string | null;
  is_verified: boolean;
  is_email_verification: boolean;
}

export interface ManageUserModel {
  id?: string;
  is_banned: boolean;
  role: RoleType | null;
  name: string;
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}


export type RoleType = 'ADMIN' | 'TEACHER' | 'STUDENT';
