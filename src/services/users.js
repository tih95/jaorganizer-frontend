import axios from 'axios';
const baseUrl = 'https://infinite-garden-10545.herokuapp.com/api/users';

export const addUser = async (body) => {
  const resp = await axios.post(`${baseUrl}/signup`, body);

  return resp.data;
}

export const login = async (body) => {
  const resp = await axios.post(`${baseUrl}/login`, body);

  return resp.data;
}

export const editUser = async (id, body, config) => {
  const resp = await axios.put(`${baseUrl}/id`, body, config);

  return resp.data;
}