import axios from "axios";

const API_URL = "http://localhost:3001/api";

interface LoginResponse {
  data: {
    token: string;
  };
  message?: string;
}

export const login = async (email: string, password: string) => {
  return axios.post<LoginResponse>(`${API_URL}/auth/login`, {
    email,
    password,
  });
};
