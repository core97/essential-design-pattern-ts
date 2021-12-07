import { BaseRecord, Recipe, DatabaseWithVisitors } from "../models";

function createDatabase<T extends BaseRecord>() {
  class InMemoryDatabase implements DatabaseWithVisitors<T> {
    private db: Record<string, T> = {};

    static instance: InMemoryDatabase = new InMemoryDatabase();

    public set(newValue: T): void {
      this.db[newValue.id] = newValue;
    }

    public get(id: string): T {
      return this.db[id];
    }

    // Visitor pattern
    visit(visitor: (item: T) => void): void {
      Object.values(this.db).forEach(visitor);
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

RecipeDB.instance.visit((item) => {
  console.log(item.name);
});
