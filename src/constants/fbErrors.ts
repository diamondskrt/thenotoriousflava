import { EFBError, IFBErrorsObject } from 'models/fbErrors';

export const fbErrorsObject: IFBErrorsObject = {
  [EFBError.AUTH_USER_NOT_FOUND]: 'Пользователь не найден',
  [EFBError.AUTH_INVALID_MESSAGE]: 'Введите валидный email',
  [EFBError.AUTH_WRONG_PASSWORD]: 'Введен не верный пароль',
};
