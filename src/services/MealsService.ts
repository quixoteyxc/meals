import { Meal } from "@/interfaces/Meal";

const API_URL = process.env.NEXT_PUBLIC_MEAL_API_URL;

export class MealsService {
  async getMeals(search: string): Promise<Meal[]> {
    try {
      const response = await fetch(`${API_URL}/search.php?s=${search}`);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      return data.meals || [];
    } catch (error) {
      throw error;
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_URL}/categories.php`);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      return data.categories.map(
        (category: { strCategory: string }) => category.strCategory,
      );
    } catch (error) {
      throw error;
    }
  }

  async getMealInfo(id?: string | Array<string> | undefined): Promise<Meal> {
    try {
      const response = await fetch(`${API_URL}/lookup.php?i=${id}`);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      throw error;
    }
  }
}
