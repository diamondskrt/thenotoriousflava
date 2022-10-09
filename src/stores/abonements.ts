import { defineStore } from 'pinia';
import { loadState, saveState, clearState } from 'helpers/persistedState';
import { IAbonement } from 'models/pages/indexPage';

export const useAbonementStore = defineStore('abonements', {
  state: () => ({
    selectedAbonements: loadState('abonements') || [],
  }),
  actions: {
    addAbonement(abonement: IAbonement) {
      this.selectedAbonements.push(abonement);

      saveState('abonements', this.selectedAbonements);
    },
    removeAbonement(abonement: IAbonement) {
      this.selectedAbonements = this.selectedAbonements.filter(
        (el: IAbonement) => el.id !== abonement.id
      );

      saveState('abonements', this.selectedAbonements);
    },
    increment(abonement: IAbonement) {
      const foundAbonement = this.selectedAbonements.find(
        (el: IAbonement) => el.id === abonement.id
      );

      if (foundAbonement && foundAbonement.counter < 5) {
        foundAbonement.counter++;
        foundAbonement.total =
          (foundAbonement.discountPrice ?? foundAbonement.price) *
          foundAbonement.counter;
      }

      saveState('abonements', this.selectedAbonements);
    },
    decrement(abonement: IAbonement) {
      const foundAbonement = this.selectedAbonements.find(
        (el: IAbonement) => el.id === abonement.id
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
