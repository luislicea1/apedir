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

const useAdminUsers = create((set) => ({
  users: [],
  setUsers: (u) => set({ users: u }),
}));

const useAdminBussiness = create((set) => ({
  bussiness: [],
  setBussiness: (b) => set({ bussiness: b }),
}));

const eventsStore = create((set) => ({
  events: [],
  setEvents: (b) => set({ events: b }),
}));

const merchantEvents = create((set) => ({
  events: [],
  setEvents: (b) => set({ events: b }),
}));

export {
  useUserStore,
  merchantEvents,
  useBussinessStore,
  useProvinceStore,
  useAdminUsers,
  useAdminBussiness,
  useBussinessList,
  useCategoriesList,
  useProductsList,
  useCartStore,
  eventsStore,
};
