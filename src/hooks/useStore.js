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

const useBussinessList = create((set) => ({
  bussinesses: null,
  setBussinesses: (b) => set({ bussinesses: b }),
}));

const useCategoriesList = create((set) => ({
  categories: null,
  setCategories: (c) => set({ categories: c }),
}));

const useProductsList = create((set) => ({
  products: null,
  setProducts: (p) => set({ products: p }),
}));

const useCartStore = create((set) => ({
  cart: [],
  setCart: (p) => set({ cart: p }),
}));

export {
  useUserStore,
  useBussinessStore,
  useProvinceStore,
  useBussinessList,
  useCategoriesList,
  useProductsList,
  useCartStore,
};

