export interface Direction {
  id: number;
  title: string;
  ageCategory: number;
  setOfGroups: boolean;
  description: string;
}

export interface Abonement {
  id: number;
  title: string;
  price: number;
  discountPrice: number | null;
  total: number;
  counter: number;
}

export interface TableRow {
  time: string | null;
  mon: string | null;
  tue: string | null;
  wed: string | null;
  thu: string | null;
  fri: string | null;
}

export interface Trainer {
  name: string;
  img: string;
  direction: string;
  description: string;
}
