"use client";

import { create } from "zustand";

interface State {
  selectedPlaylist: any;
  modalMessage: string;
  setModalMessage: (item: string) => void
  setSelectedPlaylist: (item: any) => void;
}

export const useStore = create<State>()((set) => ({
  selectedPlaylist: null,
  modalMessage: '',
  setModalMessage: (item) => set(() => ({ modalMessage: item })),
  setSelectedPlaylist: (item) => set(() => ({ selectedPlaylist: item })),
}));
