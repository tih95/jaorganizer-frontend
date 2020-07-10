import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/jobs';

export const fetchAllJobs = async (config) => {
  const resp = await axios.get(`${baseUrl}`, config);

  return resp.data;
}

export const fetchJob = async (id, config) => {
  const resp = await axios.get(`${baseUrl}/${id}`, config);

  return resp.data;
}

export const deleteJob = async (id, config) => {
  const resp = await axios.delete(`${baseUrl}/${id}`, config);

  return resp.data;
}

export const addJob = async (body, config) => {
  const resp = await axios.post(`${baseUrl}`, body, config);

  return resp.data;
}

export const editJob = async (id, body, config) => {
  const resp = await axios.put(`${baseUrl}/${id}`, body, config);

  return resp.data;
}