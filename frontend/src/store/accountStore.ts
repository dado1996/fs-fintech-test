import { create } from "zustand";

type AccountState = {
  email: string;
  balance: number;
  setEmail: (email: string) => void;
  setBalance: (balance: number) => void;
  deposit: (amount: number) => void;
};

export const useAccountStore = create<AccountState>((set) => ({
  email: "",
  balance: 0,
  setEmail: (email: string) => set((state) => ({ email })),
  setBalance: (balance: number) => set(() => ({ balance })),
  deposit: (amount: number) =>
    set((state) => ({ balance: state.balance + amount })),
}));
