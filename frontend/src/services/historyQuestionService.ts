import axios from '@/helpers/axios';
import { HistoryQuestionModel } from '@/models/questionModel';

export const getAllHistoryQuestion = async (token: string) => {
  const { data } = await axios.get('/history-question', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const getHistoryQuestionById = async (id: string, token: string) => {
  const { data } = await axios.get(`/history-question/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const createHistoryQuestion = async (
  dataHistoryQuestion: Partial<HistoryQuestionModel>,
  token: string
) => {
  const { data } = await axios.post('/history-question', dataHistoryQuestion, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};

export const updateHistoryQuestion = async (
  id: string,
  dataHistoryQuestion: Partial<HistoryQuestionModel>,
  token: string
) => {
  const { data } = await axios.put(
    `/history-question/${id}`,
    dataHistoryQuestion,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data.message;
};

export const deleteHistoryQuestion = async (id: string, token: string) => {
  const { data } = await axios.delete(`/history-question/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.message;
};
