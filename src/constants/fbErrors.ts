export interface IFBErrorsObject {
  [name: string]: string;
}

export const fbErrorsObject: IFBErrorsObject = {
  'auth/user-not-found': 'Пользователь не найден',
  'auth/invalid-email': 'Введите валидный email',
  'auth/wrong-password': 'Введен не верный пароль',
};
