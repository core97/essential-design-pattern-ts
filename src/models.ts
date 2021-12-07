export interface Recipe {
  id: string;
  name: string;
  kcal: number;
  difficulty: "easy" | "medium" | "difficult";
}

export interface BaseRecord {
  id: string;
}

export type Listener<EventType> = (ev: EventType) => void;

export interface BeforeSetEvent<T> {
  value: T;
  newValue: T;
}

export interface AfterSetEvent<T> {
  value: T;
}

export interface Database<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T;
}

export interface DatabaseWithObserbers<T extends BaseRecord> {
  set(newValue: T): void;
  get(id: string): T;

  onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void;
  onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void;
}
