import axios from "axios";
const Token = localStorage.getItem('access_token');

const API_BASE_URL = 'https://sawyou.kro.kr/api/v1/'

function CreateInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Authorization" : `Bearer ${Token}`
    }
  });
  return instance;
}

export { CreateInstance };
