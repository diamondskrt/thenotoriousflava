export enum EFBError {
  AUTH_USER_NOT_FOUND = 'auth/user-not-found',
  AUTH_INVALID_MESSAGE = 'auth/invalid-email',
  AUTH_WRONG_PASSWORD = 'auth/wrong-password',
}

export interface IFBErrorsObject {
  [name: string]: string;
}
