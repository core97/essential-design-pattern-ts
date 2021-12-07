export interface Recipe {
  id: string;
  name: string;
  kcal: number;
  difficulty: "easy" | "medium" | "difficult";
}

export interface BaseRecord {
  id: string;
}

export interface Database<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T;
}
