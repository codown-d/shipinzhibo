// src/stores/authStore.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { name: string, token: string } | null,
  }),
  actions: {
    login(user: { name: string, token: string }) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
