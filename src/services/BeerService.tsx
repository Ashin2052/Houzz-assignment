import axios, { AxiosResponse } from 'axios';

export interface IPAGINATION {
  page: number;
  limit: number;
}
const BASE_URL = 'https://api.punkapi.com/v2/beers';

export interface IBEER {
  id?: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  ingredients?: any[];
}

export const fetchBeer = async (pagination: IPAGINATION): Promise<AxiosResponse<IBEER[]>> => {
  return await axios.get(`${BASE_URL}?page=${pagination.page}&per_page=${pagination.limit}`);
};
