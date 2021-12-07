import {
  BaseRecord,
  Recipe,
  DatabaseWithObserbers,
  Listener,
  BeforeSetEvent,
  AfterSetEvent,
} from "../models";

// Observer
function createObserver<EventType>(): {
  suscribe: (listener: Listener<EventType>) => () => void;
  publish: (event: EventType) => void;
} {
  let listeners: Listener<EventType>[] = [];

  return {
    suscribe: (listener: Listener<EventType>): (() => void) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
    publish: (event: EventType) => {
      listeners.forEach((l) => l(event));
    },
  };
}

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements DatabaseWithObserbers<T> {
    private db: Record<string, T> = {};

    static instance: InMemoryDatabase = new InMemoryDatabase();

    private beforeAddListener = createObserver<BeforeSetEvent<T>>();
    private afterAddListener = createObserver<AfterSetEvent<T>>();

    public set(newValue: T): void {
      this.beforeAddListener.publish({
        newValue,
        value: this.db[newValue.id],
      });

      this.db[newValue.id] = newValue;

      this.afterAddListener.publish({
        value: newValue,
      });
    }

    public get(id: string): T {
      return this.db[id];
    }

    onBeforeAdd(listener: Listener<BeforeSetEvent<T>>): () => void {
      return this.beforeAddListener.suscribe(listener);
    }

    onAfterAdd(listener: Listener<AfterSetEvent<T>>): () => void {
      return this.afterAddListener.suscribe(listener);
    }
  }

  return InMemoryDatabase;
}

const RecipeDB = createDatabase<Recipe>();

const unsuscribe = RecipeDB.instance.onAfterAdd(({ value }) => {
  console.log(value);
});

RecipeDB.instance.set({
  id: "aadwq223",
  difficulty: "easy",
  kcal: 234,
  name: "espaguetis carbonara",
});

unsuscribe();

RecipeDB.instance.set({
  id: "JGON3231",
  difficulty: "easy",
  kcal: 324,
  name: "lentejas",
});
