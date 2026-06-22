// src/store/favoritesStore.ts
//
// Store de favoritos (Zustand). Lista de ids de filmes favoritados.
// Versão IMPLEMENTADA — nesta disciplina o foco é TESTAR este código.
//
// Doc: https://github.com/pmndrs/zustand

import { create } from 'zustand';

type FavoritesState = {
  ids: number[];
  add: (id: number) => void;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  clear: () => void;
  isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: [],
  add: (id) => set((s) => (s.ids.includes(id) ? s : { ids: [...s.ids, id] })),
  remove: (id) => set((s) => ({ ids: s.ids.filter((x) => x !== id) })),
  toggle: (id) =>
    set((s) =>
      s.ids.includes(id)
        ? { ids: s.ids.filter((x) => x !== id) }
        : { ids: [...s.ids, id] }
    ),
  clear: () => set({ ids: [] }),
  isFavorite: (id) => get().ids.includes(id),
}));
