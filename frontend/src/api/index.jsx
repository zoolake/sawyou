import axios from "axios";


const API_BASE_URL = 'https://sawyou.kro.kr/api/v1/'

function CreateInstance() {
  const Token = localStorage.getItem('access_token');
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Authorization" : `Bearer ${Token}`
    }
  });

  return instance;
}

function LoginInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });
  return instance;
}

export { CreateInstance, LoginInstance };
