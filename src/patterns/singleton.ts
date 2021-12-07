import { BaseRecord, Recipe, Database } from "../models";

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
  }

  // Singleton pattern
  // const db = new InMemoryDatabase();
  // return db;
  return InMemoryDatabase;
}

const RecipeDB = createDatabase<Recipe>();

RecipeDB.instance.set({
  id: "aadwq223",
  difficulty: "easy",
  kcal: 234,
  name: "espaguetis carbonara",
});

console.log(RecipeDB.instance.get("aadwq223"));
