"use client";
import { useParams } from "next/navigation";
import { MealsService } from "@/services/MealsService";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "@/interfaces/Meal";
import { IngredientsList } from "@/components/ui/IngredientsList";
import { Instructions } from "@/components/ui/Instructions";
import { YouTubeLink } from "@/components/ui/YouTibeLink";
import { getIngredientsFromMeal } from "@/helpers/ingridientsMaker";

const MealInformation = () => {
  const params = useParams();
  const { id } = params;
  const mealInfo = useQuery<Meal | null>({
    queryKey: [id],
    queryFn: async () => {
      const mealsService = new MealsService();
      return await mealsService.getMealInfo(id);
    },
    staleTime: 60 * 1000,
  });
  const { data, isLoading } = mealInfo;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="container mx-auto p-4">
          {data && (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <img
                  src={data.strMealThumb}
                  alt={data.strMeal}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4">{data.strMeal}</h1>
                <p className="text-lg text-gray-700 mb-4">
                  <b>Category:</b> {data.strCategory}
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  <b>Area:</b> {data.strArea}
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  <b>Tags:</b> {data.strTags}
                </p>
                <a
                  href={data.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mb-4 inline-block"
                >
                  Source: {data.strSource}
                </a>
                <IngredientsList ingredients={getIngredientsFromMeal(data)} />
                <Instructions instructions={data.strInstructions} />
                <YouTubeLink
                  videoLink={data.strYoutube}
                  mealName={data.strMeal}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MealInformation;
