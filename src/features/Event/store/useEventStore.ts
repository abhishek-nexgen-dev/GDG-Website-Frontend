import { create } from "zustand";

export interface EventFilterState {
  search: string;
  category: string;
  status: string;
  page: number;
  limit: number;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setStatus: (status: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetFilters: () => void;
}

export const useEventStore = create<EventFilterState>((set) => ({
  search: "",
  category: "",
  status: "",
  page: 1,
  limit: 6,

  setSearch: (search) => set({ search, page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  resetFilters: () => set({ search: "", category: "", status: "", page: 1 }),
}));

export default useEventStore;
