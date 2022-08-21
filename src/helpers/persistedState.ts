export const loadState = <T>(name: string): T | null => {
  const serializedState: string | null = localStorage.getItem(name);
  return serializedState ? JSON.parse(serializedState) : serializedState;
};

export const saveState = <T>(name: string, state: T | null): void => {
  const serializedState: string = JSON.stringify(state);
  localStorage.setItem(name, serializedState);
};

export const clearState = (name: string): void => {
  localStorage.removeItem(name);
};
