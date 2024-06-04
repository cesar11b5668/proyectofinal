// src/api/marvelapi.js
import axios from 'axios';
import md5 from 'crypto-js/md5';

const PUBLIC_KEY = import.meta.env.VITE_MARVEL_API_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_MARVEL_API_PRIVATE_KEY;
const BASE_URL = 'https://gateway.marvel.com/v1/public';

const getAuthParams = () => {
  const ts = new Date().getTime();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
  return { ts, apikey: PUBLIC_KEY, hash };
};

export const getCharacters = async (name = '') => {
  try {
    const authParams = getAuthParams();
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: {
        ...authParams,
        nameStartsWith: name,
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching data from Marvel API:', error);
    throw error;
  }
};

export const getRandomCharacters = async () => {
  try {
    const authParams = getAuthParams();
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: {
        ...authParams,
        limit: 3,
        offset: Math.floor(Math.random() * 1000), // Para obtener 3 personajes aleatorios
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching data from Marvel API:', error);
    throw error;
  }
};
