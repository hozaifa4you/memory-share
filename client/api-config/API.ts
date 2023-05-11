import axios, { AxiosInstance } from "axios";

const api_url = process.env.BACKEND_URL as string;

// TODO: api instance
export const API: AxiosInstance = axios.create({
  baseURL: api_url,
  headers: { "Content-Type": "application/json" },
});

// TODO: login user types
export interface LoginUserTypes {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
}
