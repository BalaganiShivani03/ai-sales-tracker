import axios from 'axios';

const API = 'http://localhost:5000/api/ai/recommend';

export const getAIRecommendations = async (deals) => {
  const res = await axios.post(API, { deals });
  return res.data;
};
