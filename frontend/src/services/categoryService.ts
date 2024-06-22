import axios from '@/helpers/axios';
import { CategoryModel } from '@/models/categoryModel';

export const getAllCategory = async () => {
  const { data } = await axios.get('/categories');
  return data.data;
};

export const getCategoryById = async (id: string) => {
  const { data } = await axios.get(`/categories/${id}`);
  return data.data;
};

export const createCategory = async (
  dataCategory: Partial<CategoryModel>,
  token: string
) => {
  const { data } = await axios.post('/categories', dataCategory, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const updateCategory = async (
  id: string,
  dataCategory: Partial<CategoryModel>,
  token: string
) => {
  const { data } = await axios.patch(`/categories/${id}`, dataCategory, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const deleteCategory = async (id: string, token: string) => {
  const { data } = await axios.delete(`/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
