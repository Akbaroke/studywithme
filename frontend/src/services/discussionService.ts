import axios from '@/helpers/axios';
import { DiscussionModel } from '@/models/contentModel';

export const getAllDiscussion = async () => {
  const { data } = await axios.get('/discussions');
  return data.data;
};

export const getDiscussionById = async (id: string) => {
  const { data } = await axios.get(`/discussions/${id}`);
  return data.data;
};

export const createDiscussion = async (
  dataDiscussion: Partial<DiscussionModel>,
  token: string
) => {
  const { data } = await axios.post('/discussions', dataDiscussion, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const updateDiscussion = async (
  id: string,
  dataDiscussion: Partial<DiscussionModel>,
  token: string
) => {
  const { data } = await axios.patch(`/discussions/${id}`, dataDiscussion, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const deleteDiscussion = async (id: string, token: string) => {
  const { data } = await axios.delete(`/discussions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};
