import { Ingredient, Meal } from "@/interfaces/Meal";

export const getIngredientsFromMeal = (meal: Meal): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const nameKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    const name = meal[nameKey];
    const measure = meal[measureKey];

    if (name) {
      ingredients.push({
        name,
        measure: measure || "",
      });
    }
  }
  return ingredients;
};
