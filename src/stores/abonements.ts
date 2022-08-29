import { defineStore } from 'pinia';
import { loadState, saveState, clearState } from 'helpers/persistedState';
import { Abonement } from 'models/indexPage';

export const useAbonementStore = defineStore('abonements', {
  state: () => ({
    selectedAbonements: loadState('abonements') || [],
  }),
  actions: {
    addAbonement(abonement: Abonement) {
      this.selectedAbonements.push(abonement);

      saveState('abonements', this.selectedAbonements);
    },
    removeAbonement(abonement: Abonement) {
      this.selectedAbonements = this.selectedAbonements.filter(
        (el: Abonement) => el.id !== abonement.id
      );

      saveState('abonements', this.selectedAbonements);
    },
    increment(abonement: Abonement) {
      const foundAbonement = this.selectedAbonements.find(
        (el: Abonement) => el.id === abonement.id
      );

      if (foundAbonement && foundAbonement.counter < 5) {
        foundAbonement.counter++;
        foundAbonement.total =
          (foundAbonement.discountPrice ?? foundAbonement.price) *
          foundAbonement.counter;
      }

      saveState('abonements', this.selectedAbonements);
    },
    decrement(abonement: Abonement) {
      const foundAbonement = this.selectedAbonements.find(
        (el: Abonement) => el.id === abonement.id
      );

      if (foundAbonement && foundAbonement.counter > 1) {
        foundAbonement.counter--;
        foundAbonement.total =
          (foundAbonement.discountPrice ?? foundAbonement.price) *
          foundAbonement.counter;
      } else {
        this.removeAbonement(abonement);
      }

      saveState('abonements', this.selectedAbonements);
    },
    clearAbonements() {
      this.selectedAbonements = [];
      clearState('abonements');
    },
  },
});
