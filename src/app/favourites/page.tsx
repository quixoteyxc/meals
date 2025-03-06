"use client";
import { Meal } from "@/interfaces/Meal";
import { Instructions } from "@/components/ui/Instructions";
import { useFavouriteStore } from "@/store/favouriteStore";
import { IngredientsList } from "@/components/ui/IngredientsList";
import { getIngredientsFromMeal } from "@/helpers/ingridientsMaker";
import { Button } from "@/components/ui/Button";
import { NotifyService } from "@/services/NotifyService";

const Favourites = () => {
  const { meals, clearMeals } = useFavouriteStore();

  const renderMealCard = (meal: Meal) => (
    <div
      key={meal.idMeal}
      className="flex flex-col lg:flex-row gap-8 mb-8 p-4 border rounded-lg shadow-md"
    >
      <div className="flex-1">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4">{meal.strMeal}</h2>
        <IngredientsList
          ingredients={getIngredientsFromMeal(meal)}
          headText="Ingredients"
        />
        <Instructions instructions={meal.strInstructions} />
      </div>
    </div>
  );

  const allIngredients = meals.reduce(
    (acc, meal) => {
      return [...acc, ...getIngredientsFromMeal(meal)];
    },
    [] as { name: string; measure: string }[],
  );

  return (
    <div className="container mx-auto p-4">
      {meals.length > 0 && (
        <Button
          className="mb-2"
          onClick={() => {
            clearMeals();
            NotifyService.success("All favourites has been deleted ");
          }}
        >
          Clear favourite
        </Button>
      )}

      {meals.length === 0 ? (
        <div className="text-lg text-gray-700">
          You have no favourite meals yet.
        </div>
      ) : (
        meals.map(renderMealCard)
      )}

      {meals.length > 0 && (
        <IngredientsList
          ingredients={allIngredients}
          headText="All Ingredients"
        />
      )}
    </div>
  );
};

export default Favourites;
