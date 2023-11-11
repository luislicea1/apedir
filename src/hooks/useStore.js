import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));

const useBussinessStore = create((set) => ({
  bussiness: null,
  setBussiness: (b) => set({ bussiness: b }),
}));

export {useUserStore, useBussinessStore};
