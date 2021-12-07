import {
  BaseRecord,
  Recipe,
  Database,
  Listener,
  BeforeSetEvent,
  AfterSetEvent,
} from "../models";

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    static instance: InMemoryDatabase = new InMemoryDatabase();

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T {
      return this.db[id];
    }

    // Strategy pattern
    selectHigher(scoreStrategy: (item: T) => number): T | undefined {
      const found: {
        max: number;
        item: T | undefined;
      } = {
        max: 0,
        item: undefined,
      };

      Object.values(this.db).reduce((f, item) => {
        const score = scoreStrategy(item);
        if (score > f.max) {
          f.max = score;
          f.item = item;
        }
        return f;
      }, found);

      return found.item;
    }
  }

  return InMemoryDatabase;
}

const RecipeDB = createDatabase<Recipe>();

RecipeDB.instance.set({
  id: "aadwq223",
  difficulty: "easy",
  kcal: 234,
  name: "espaguetis carbonara",
});

RecipeDB.instance.set({
  id: "JGON3231",
  difficulty: "easy",
  kcal: 324,
  name: "lentejas",
});

const recipeWithMoreCalories = RecipeDB.instance.selectHigher(({ kcal }) => kcal);

console.log(`Receta con más caloría: ${recipeWithMoreCalories?.name}`)


