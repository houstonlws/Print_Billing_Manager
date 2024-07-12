export interface Department {
  id: string;
  category: string;
  name: string;
}

export interface DataState {
  departments: Department[];
}

export type Type = {
  id: string;
  name: string;
};
