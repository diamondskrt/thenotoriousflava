import { useAbonementStore } from 'stores/abonements';
import { IAbonement } from 'models/pages/indexPage';

class UseAbonement {
  abonementStore = () => {
    const abonementStore = useAbonementStore();

    return abonementStore;
  };

  foundAbonement = (abonement: IAbonement) =>
    this.abonementStore().selectedAbonements.find(
      ({ id }: IAbonement) => id === abonement.id
    );

  onAddAbonement = (abonement: IAbonement) =>
    this.abonementStore().addAbonement(abonement);

  onRemoveAbonement = (abonement: IAbonement) =>
    this.abonementStore().removeAbonement(abonement);

  onDecrement = (abonement: IAbonement) =>
    this.abonementStore().decrement(abonement);

  onIncrement = (abonement: IAbonement) =>
    this.abonementStore().increment(abonement);
}

export const useAbonement = new UseAbonement();
