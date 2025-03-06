import { create } from "zustand";
import { Meal } from "@/interfaces/Meal";

interface Store {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void;
  clearMeals: () => void;
}

export const useFavouriteStore = create<Store>((set) => {
  const isClient = typeof window !== "undefined";

  let storedMeals: Meal[] = [];

  if (isClient) {
    const stored = localStorage.getItem("FAVOURITE_MEALS");
    storedMeals = stored ? JSON.parse(stored) : [];
  }

  return {
    meals: storedMeals,

    addMeal: (meal: Meal) =>
      set((state) => {
        const isMealExist = state.meals.some(
          (existingMeal) => existingMeal.idMeal === meal.idMeal,
        );
        if (isMealExist) {
          return state;
        }
        const updatedMeals = [...state.meals, meal];
        if (isClient) {
          localStorage.setItem("FAVOURITE_MEALS", JSON.stringify(updatedMeals));
        }
        return { meals: updatedMeals };
      }),

    removeMeal: (mealId: string) =>
      set((state) => {
        const updatedMeals = state.meals.filter(
          (meal) => meal.idMeal !== mealId,
        );
        if (isClient) {
          localStorage.setItem("FAVOURITE_MEALS", JSON.stringify(updatedMeals));
        }
        return { meals: updatedMeals };
      }),

    clearMeals: () =>
      set(() => {
        if (isClient) {
          localStorage.removeItem("FAVOURITE_MEALS");
        }
        return { meals: [] };
      }),
  };
});
