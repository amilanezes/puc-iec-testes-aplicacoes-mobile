// src/store/authStore.ts
//
// Auth mock (Zustand). Login local — sem backend, sem rede.
// Serve de "porteiro" pro app: enquanto não logado, RootStack mostra a tela de Login.
//
// Útil pra E2E:
//   - conditional flow: "se a tela de login aparecer, faça login; senão, siga"
//   - fragment reutilizável: um único flow de login chamado por vários testes

import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

// Regra mock: qualquer email com "@" + senha de 4+ chars autentica.
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  email: null,
  login: (email, password) => {
    const ok = email.includes('@') && password.trim().length >= 4;
    if (ok) set({ isAuthenticated: true, email });
    return ok;
  },
  logout: () => set({ isAuthenticated: false, email: null }),
}));
