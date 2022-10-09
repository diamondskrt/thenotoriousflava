export type TMenuItems = Omit<IUserMenuItems, 'icon' | 'disabled'>;

export interface IUserMenuItems {
  title: string;
  link: string;
  icon: string;
  disabled: boolean;
}
