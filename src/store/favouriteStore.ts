import { create } from "zustand";
import { Meal } from "@/interfaces/Meal";
import { LocalStorageService } from "@/services/LocalStorageService";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";

interface Store {
  meals: Meal[];
  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void;
  clearMeals: () => void;
}

export const useFavouriteStore = create<Store>((set) => {
  const storedMeals =
    LocalStorageService.get<Meal[]>(LOCAL_STORAGE_KEYS.FAVOURITE_MEALS) || [];

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
        LocalStorageService.set(
          LOCAL_STORAGE_KEYS.FAVOURITE_MEALS,
          updatedMeals,
        );
        return { meals: updatedMeals };
      }),

    removeMeal: (mealId: string) =>
      set((state) => {
        const updatedMeals = state.meals.filter(
          (meal) => meal.idMeal !== mealId,
        );
        LocalStorageService.set(
          LOCAL_STORAGE_KEYS.FAVOURITE_MEALS,
          updatedMeals,
        );
        return { meals: updatedMeals };
      }),

    clearMeals: () =>
      set(() => {
        LocalStorageService.remove(LOCAL_STORAGE_KEYS.FAVOURITE_MEALS);
        return { meals: [] };
      }),
  };
});
