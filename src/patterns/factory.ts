import { BaseRecord, Database, Recipe } from "../models";

// Factory pattern
function createDatabase<T extends BaseRecord>(type: "memory" | "mongo") {
  class InMemoryDatabase implements Database<T> {
    private db: Record<string, T> = {};

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T {
      return this.db[id];
    }
  }

  class MongoDatabase implements Database<T> {
    private db: Record<string, T> = {};

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T {
      return this.db[id];
    }
  }

  if (type === "mongo") {
    return MongoDatabase;
  }

  return InMemoryDatabase;
}

const RecipeDB = createDatabase<Recipe>("memory");
const recipeDB = new RecipeDB();

recipeDB.set({
  id: "aadwq223",
  difficulty: "easy",
  kcal: 234,
  name: "espaguetis carbonara",
});

console.log(recipeDB.get("aadwq223"));
