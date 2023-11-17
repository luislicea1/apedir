import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));

const useBussinessStore = create((set) => ({
  bussiness: null,
  setBussiness: (b) => set({ bussiness: b }),
}));

const useProvinceStore = create((set) => ({
  province: "todas",
  setProvince: (p) => set({ province: p }),
}));
export { useUserStore, useBussinessStore, useProvinceStore };
