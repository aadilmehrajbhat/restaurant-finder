import axios from 'axios';

export const PROXY_API_URL = process.env.PROXY_API_URL;

export const YELP_BASE_URL = 'https://api.yelp.com/v3';

export const yelpApiClient = axios.create({
  baseURL: PROXY_API_URL + YELP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
  },
});
