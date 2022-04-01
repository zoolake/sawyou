import axios from "axios";
const Token = localStorage.getItem('access_token');

const API_BASE_URL = 'https://sawyou.kro.kr/api/v1/'

let a = null

if (Token){
  a = `Bearer ${Token}`
}

function CreateInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Authorization" : `${a}`
    }
  });
  return instance;
}

export { CreateInstance };
