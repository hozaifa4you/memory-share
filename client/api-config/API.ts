import axios, { AxiosInstance } from "axios";

const api_url = process.env.NEXT_PUBLIC_BACKEND_ORIGIN as string;

// TODO: api instance
export const API: AxiosInstance = axios.create({
  baseURL: api_url,
  headers: { "Content-Type": "application/json" },
});

// TODO: login user types

export interface RegisterUserTypes {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginUserTypes extends RegisterUserTypes {
  token: string;
}

export interface MemoryMediaUploadType {
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: string;
}

export interface DeletePhotoReturnType {
  success: boolean;
  photoName: string;
}

export interface Slug {
  success: boolean;
  slug: string;
}
