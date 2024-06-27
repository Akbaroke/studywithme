import axios from '@/helpers/axios';
import { QuestionModel } from '@/models/questionModel';

export const getAllQuestion = async (token: string) => {
  const { data } = await axios.get('/questions', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const getQuestionById = async (id: string, token: string) => {
  const { data } = await axios.get(`/questions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const createQuestion = async (
  dataQuestion: Partial<QuestionModel>,
  token: string
) => {
  const { data } = await axios.post('/questions', dataQuestion, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const updateQuestion = async (
  id: string,
  dataQuestion: Partial<QuestionModel>,
  token: string
) => {
  const { data } = await axios.patch(`/questions/${id}`, dataQuestion, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const deleteQuestion = async (id: string, token: string) => {
  const { data } = await axios.delete(`/questions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};
