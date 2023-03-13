import createHeaders from '@/helpers/createHeaders';
import axios, { AxiosError } from 'axios';

export interface Response<T> {
  data: T | T[];
  isLoading: boolean;
  isError: boolean;
}

export default class Service<T> {
  protected HOST = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  protected BASE_URL: string;

  constructor(baseUrl: string) {
    this.BASE_URL = baseUrl;
  }

  protected async getRequest(
    url: string = '',
    accessToken?: string
  ): Promise<any> {
    try {
      const headers = createHeaders('application/json', accessToken);
      return await axios.get(`${this.HOST}${this.BASE_URL}/${url}`, {
        headers,
      });
    } catch (error) {
      return error as AxiosError;
    }
  }

  protected async postRequest(
    url: string,
    data: any,
    accessToken?: string
  ): Promise<any> {
    try {
      const headers = createHeaders('application/json', accessToken);
      return await axios.post(`${this.HOST}${this.BASE_URL}/${url}`, data, {
        headers,
      });
    } catch (error: any) {
      return error as AxiosError;
    }
  }
}
