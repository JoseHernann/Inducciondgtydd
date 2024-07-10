import axios from 'axios';
const instance = axios.create({
  baseURL: `http://vizionizewebapi.somee.com/api/`,
  timeout: 0,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',

  },
});

export default instance;
