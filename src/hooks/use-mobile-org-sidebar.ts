import { create } from "zustand";
interface UseMobileSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const UseMobileSidebar = create<UseMobileSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
