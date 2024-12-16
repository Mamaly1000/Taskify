import { create } from "zustand";
interface UseCardModalStore {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}
export const UseCardModal = create<UseCardModalStore>((set) => ({
  isOpen: false,
  id: undefined,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
