import { defineStore } from 'pinia';
import { loadState, saveState, clearState } from 'helpers/persistedState';

export interface User {
  name: string;
  role: string;
}

export const useAuthStore = defineStore('user', {
  state: () => ({
    user: loadState('user'),
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
      saveState('user', this.user);
    },
    clearUser() {
      this.user = null;
      clearState('user');
    },
  },
});
