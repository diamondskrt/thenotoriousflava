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
        ({ id }: IAbonement) => id !== abonement.id
      );

      saveState('abonements', this.selectedAbonements);
    },
    increment(abonement: IAbonement) {
      const foundAbonement = this.selectedAbonements.find(
        ({ id }: IAbonement) => id === abonement.id
      );

      if (foundAbonement?.counter < 5) {
        foundAbonement.counter += 1;

        foundAbonement.total =
          (foundAbonement.discountPrice ?? foundAbonement.price) *
          foundAbonement.counter;
      }

      saveState('abonements', this.selectedAbonements);
    },
    decrement(abonement: IAbonement) {
      const foundAbonement = this.selectedAbonements.find(
        ({ id }: IAbonement) => id === abonement.id
      );

      if (foundAbonement?.counter > 1) {
        foundAbonement.counter -= 1;

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
