import axios from "axios";

const API_URL = "http://localhost:3001/api";

interface DepositResponse {
  message: string;
  data?: {
    balance: number;
  };
}

export const fetchDeposit = (email: string, amount: number) => {
  const token = localStorage.getItem("token");
  return axios.post<DepositResponse>(
    `${API_URL}/transactions/deposit`,
    { email, amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
