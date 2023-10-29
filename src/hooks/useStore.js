import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));

export default useUserStore;
