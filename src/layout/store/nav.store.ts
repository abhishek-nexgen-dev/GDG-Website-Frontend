import { create } from "zustand";

type NavStoreType = {
  isSideBarOpen: boolean;
  handleSideBar: (isOpen: boolean) => void;
};

const useNavStore = create<NavStoreType>()((set) => ({
  isSideBarOpen: false,

  handleSideBar: (isOpen) => set(() => ({ isSideBarOpen: isOpen })),
}));

export default useNavStore;
