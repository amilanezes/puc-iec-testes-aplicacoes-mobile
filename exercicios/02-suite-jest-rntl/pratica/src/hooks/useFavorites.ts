// src/hooks/useFavorites.ts
//
// Hook de favoritos — fina camada sobre useFavoritesStore.
// Versão IMPLEMENTADA. Existe pra ser testada ISOLADA com `renderHook`
// (Atividade 2 — Parte B, Bloco 2 de integração).
//
// Por que um hook por cima do store?
//   - expõe uma API enxuta pro componente (count derivado, sem ler ids cru)
//   - é o caso perfeito pra `renderHook`: roda lógica de React sem tela

import { useFavoritesStore } from '@/store/favoritesStore';

export function useFavorites() {
  const ids = useFavoritesStore((s) => s.ids);
  const toggle = useFavoritesStore((s) => s.toggle);
  const add = useFavoritesStore((s) => s.add);
  const remove = useFavoritesStore((s) => s.remove);
  const clear = useFavoritesStore((s) => s.clear);

  return {
    ids,
    count: ids.length,
    isFavorite: (id: number) => ids.includes(id),
    toggle,
    add,
    remove,
    clear,
  };
}
