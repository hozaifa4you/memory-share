import { MemoryType } from "@/utils/options";
import axios, { AxiosInstance } from "axios";

const api_url = process.env.NEXT_PUBLIC_BACKEND_ORIGIN as string;

export interface GeneralError {
  response: { data: { message: string } };
}

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

export interface AllMemoriesTypes {
  id: string;
  slug: string;
  title: string;
  body: string;
  images: string[];
  likes?: string[];
  saved?: string[];
  tags: string[];
  category: string;
  memoryType: string; // FIXME: set from enum type
  createdAT: Date;
  updatedAt: Date;
  userId: string;
  placeId?: string;
  place?: { country?: string };
  user: { id: string; name: string; avatar: string; username: string };
  comments?: object[];
  readTime: number;
}

interface MemoryDetails {
  id: string;
  slug: string;
  title: string;
  body: string;
  images: string[];
  likes?: string[];
  saved?: string[];
  tags: string[];
  category: string;
  memoryType: MemoryType;
  readTime: number | null;
  userId: string;
  user: {
    id: string;
    name: string;
    username: string;
    userType: string;
    email: string;
    avatar?: string;
  };
  placeId?: string;
  place?: {
    id: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// TODO: api instance
export const API: AxiosInstance = axios.create({
  baseURL: api_url,
  headers: { "Content-Type": "application/json" },
});

// TODO: get all post => react query
export const allMemories = async (token?: string) => {
  if (token) {
    const { data } = await API.get<AllMemoriesTypes[]>(
      "/api/v1/memories/get-all",
      { headers: { authorization: `Bearer ${token}` } }
    );
    return data;
  } else {
    const { data } = await API.get<AllMemoriesTypes[]>(
      "/api/v1/memories/get-all"
    );
    return data;
  }
};

// TODO: get memory by slug
export const memoryDetails = async (
  slug: string,
  token?: string | null | undefined
) => {
  if (token) {
    const { data } = await API.get<MemoryDetails>(
      `/api/v1/memories/memory-details/${slug}`,
      { headers: { authorization: `Bearer ${token}` } }
    );
    return data;
  } else {
    const { data } = await API.get<MemoryDetails>(
      `/api/v1/memories/memory-details/${slug}`
    );
    return data;
  }
};
