import { UserModel } from '@/models/userModel';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export default async function getSession(req: NextRequest): Promise<UserModel> {
  const tokenNextAuth = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const sessionData: UserModel = tokenNextAuth as unknown as UserModel;

  return sessionData;
}
