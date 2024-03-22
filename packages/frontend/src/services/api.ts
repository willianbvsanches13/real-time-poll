import axios from 'axios';
import { PollModel } from '../models/poll';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPoll = async (pollID: string) => {
  const { data } = await api.get(`/polls/${pollID}`);
  return data;
};

export const addPoll = async (poll: PollModel) => {
  const { data } = await api.post('/polls', poll);
  return data;
};

export const votePoll = async (pollID: string, optionID: string) => {
  const { data } = await api.post(`/polls/${pollID}/vote`, { optionIDs: [optionID] });
  return data;
};
