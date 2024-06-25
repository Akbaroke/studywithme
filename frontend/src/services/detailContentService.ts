import axios from '@/helpers/axios';
import { DetailContentModel } from '@/models/contentModel';

export const getAllDetailContentByContentId = async (
  id: string,
  token: string
): Promise<DetailContentModel> => {
  const { data } = await axios.get(`/contents/detail-contents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const getDetailContentById = async (
  id: string,
  token: string
): Promise<DetailContentModel> => {
  const { data } = await axios.get(`/detail-contents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const createDetailContent = async (
  dataContent: Partial<DetailContentModel>,
  token: string
) => {
  const { data } = await axios.post('/detail-contents', dataContent, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const updateDetailContent = async (
  id: string,
  dataContent: Partial<DetailContentModel>,
  token: string
) => {
  const { data } = await axios.patch(`/detail-contents/${id}`, dataContent, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const deleteDetailContent = async (id: string, token: string) => {
  const { data } = await axios.delete(`/detail-contents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};
