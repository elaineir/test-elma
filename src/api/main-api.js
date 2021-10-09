import { BASE_URL } from '../config/config';

const checkServerResponse = (res) => (res.ok ? res.json() : Promise.reject(res));

const getData = async (route) => {
  const res = await fetch(`${BASE_URL}${route}`, { method: 'GET' });
  return checkServerResponse(res);
};

export default getData;
