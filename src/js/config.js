// Contains all the constant variables that we might change in the future for the app
export const API_URL = 'https://exercisedb.p.rapidapi.com/exercises';
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 7;
