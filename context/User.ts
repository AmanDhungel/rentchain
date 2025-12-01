import { create } from "zustand";

type User = {
  role: string;
  fullName: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  isLoggedIn: boolean;
  loginData: (userData: User) => void;
  logout: () => void;
  updateName: (newName: string) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoggedIn: false,

  loginData: (userData) =>
    set({
      user: userData,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),

  updateName: (newName) =>
    set((state) => ({
      user: state.user ? { ...state.user, name: newName } : null,
    })),
}));

export default useAuthStore;
