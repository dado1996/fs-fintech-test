import axios from "axios";

const API_URL = "http://localhost:3001/api";

interface LoginResponse {
  data?: {
    token: string;
    email: string;
    balance: number;
  };
  message?: string;
}

interface RegisterDTO {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}

interface RegisterResponse {
  message: string;
}

export const login = async (email: string, password: string) => {
  return axios.post<LoginResponse>(`${API_URL}/auth/login`, {
    email,
    password,
  });
};

export const register = async ({
  fullName,
  email,
  phone,
  password,
}: RegisterDTO) => {
  return axios.post<RegisterResponse>(`${API_URL}/auth/register`, {
    name: fullName,
    email,
    phone,
    password,
  });
};
