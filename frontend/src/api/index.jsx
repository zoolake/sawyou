import axios from "axios";

// const API_BASE_URL = 'http://localhost:3000'
const API_BASE_URL = 'https://date.nager.at/api/v3/publicholidays/2017/'

function createInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
    }
  });
  return instance;
}

export { createInstance };
