import { User } from './account.types';

export type PriceConfig = {
  id: string;
  name: string;
  bw_price: string;
  color_price: string;
  paper_price: string;
  is_active: string;
};

export type AdminState = {
  users: User[];
  priceProfiles: PriceConfig[];
  activeProfile: PriceConfig;
};

export type AuthState = {
  loggedIn: boolean;
};
