import axios from '@/helpers/axios';
import { ManageUserModel } from '@/models/userModel';

export const updateUser = async (
  id: string,
  dataUser: Partial<ManageUserModel>,
  token: string
) => {
  const { data } = await axios.patch(`/manage-users/${id}`, dataUser, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const getAllUsers = async (token: string) => {
  const { data } = await axios.get('/manage-users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const getUserById = async (id: string, token: string) => {
  const { data } = await axios.get(`/manage-users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data.data;
};
