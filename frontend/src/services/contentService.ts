import axios from '@/helpers/axios';
import { ContentModel } from '@/models/contentModel';

export const getAllContent = async () => {
  const { data } = await axios.get('/contents');
  return data.data;
};

export const getNewContent = async () => {
  const { data } = await axios.get('/contents/new');
  return data.data;
};

export const getFreeContent = async () => {
  const { data } = await axios.get('/contents/free');
  return data.data;
};

export const getMostClickedContent = async () => {
  const { data } = await axios.get('/contents/most-click');
  return data.data;
};

export const getContentById = async (
  id: string,
  token: string
): Promise<ContentModel> => {
  const { data } = await axios.get(`/contents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const createContent = async (
  dataContent: Partial<ContentModel>,
  token: string
) => {
  const { data } = await axios.post('/contents', dataContent, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const updateContent = async (
  id: string,
  dataContent: Partial<ContentModel>,
  token: string
) => {
  const { data } = await axios.patch(`/contents/${id}`, dataContent, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const clickedContent = async (id: string) => {
  const { data } = await axios.patch(`/contents/klik/${id}`);
  return data.message;
};

export const deleteContent = async (id: string, token: string) => {
  const { data } = await axios.delete(`/contents/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};
