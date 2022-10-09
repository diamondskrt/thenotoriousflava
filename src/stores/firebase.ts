import { defineStore } from 'pinia';
import { FirebaseError } from 'firebase/app';
import { loadState, saveState, clearState } from 'helpers/persistedState';

export interface User {
  name: string;
  role: string;
}

export const useFirebaseStore = defineStore('firebase', {
  state: () => ({
    user: loadState('user'),
    fbError: null as FirebaseError | null,
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
    setFBError(error: FirebaseError) {
      this.fbError = error;
    },
    clearFBError() {
      this.fbError = null;
    },
  },
});
