import axios from 'axios';

const API = 'http://localhost:5000/api/deals';

export const getDeals = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const updateDeal = async (id, updates) => {
  const res = await axios.put(`${API}/${id}`, updates);
  return res.data;
};

// ✅ Add this function:
export const createDeal = async (deal) => {
  const res = await axios.post(API, deal);
  return res.data;
};
