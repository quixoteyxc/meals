"use client";
import { useQuery } from "@tanstack/react-query";
import { Meal } from "@/interfaces/Meal";
import { MealsService } from "@/services/MealsService";
import { ProductCard } from "@/components/ui/ProductCard";
import { useState } from "react";
import { TextInput } from "@/components/ui/TextInput";
import { useDebounce } from "use-debounce";
import CategoryList from "@/components/ui/Categories";
import { Pagination } from "@/components/ui/Pagination";
import { AdditionalInfoMaker } from "@/helpers/additionalInfoMaker";
import { useRouter } from "next/navigation";
import { LETTERS_ARRAY, ROUTES } from "@/constants/commons";
import { useFavouriteStore } from "@/store/favouriteStore";
import { NotifyService } from "@/services/NotifyService";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();
  const mealsQuery = useQuery<Meal[] | null>({
    queryKey: [debouncedSearch, selectedCategories],
    queryFn: async () => {
      const service = new MealsService();
      if (debouncedSearch) {
        return await service.getMeals(debouncedSearch);
      } else {
        const mealRequests = LETTERS_ARRAY.map((letter) =>
          service.getMeals(letter),
        );
        const mealsByLetter = await Promise.all(mealRequests);
        return Array.from(
          new Map(
            mealsByLetter.flat().map((item) => [item.idMeal, item]),
          ).values(),
        ).sort((a, b) => a.strMeal.localeCompare(b.strMeal));
      }
    },
    staleTime: 60 * 1000,
  });

  const { addMeal, removeMeal, meals: favouriteMeals } = useFavouriteStore();
  const { data, isLoading, isError } = mealsQuery;
  const filteredMeals = data
    ? data.filter(
        (meal) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(meal.strCategory),
      )
    : [];
  const mealsPerPage = 10;
  const pageCount = Math.ceil(filteredMeals.length / mealsPerPage);
  const displayedMeals = filteredMeals.slice(
    pageNumber * mealsPerPage,
    (pageNumber + 1) * mealsPerPage,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPageNumber(0);
  };
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setPageNumber(0);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPageNumber(selectedItem.selected);
  };

  const redirectToMealPage = async (id: string) => {
    router.push(ROUTES.MEAL_INFO(id));
  };

  const removeMealFromFavourite = (id: string) => {
    removeMeal(id);
    NotifyService.success("Removed from favourites");
  };

  const addMealToFavourite = (meal: Meal) => {
    addMeal(meal);
    NotifyService.success("Added");
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-2">
        <TextInput
          onChange={handleSearchChange}
          className="max-w-[200px]"
          placeholder="Search"
        />
        <Button
          onClick={() => {
            router.push(ROUTES.FAVOURITE_MEALS);
          }}
        >
          To favourites
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <CategoryList onCategoryChange={handleCategoryChange} />
        </div>
        <div className="md:col-span-3">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {displayedMeals.map((meal) => {
                  const isFavourite = favouriteMeals.some(
                    (favMeal) => favMeal.idMeal === meal.idMeal,
                  );
                  return (
                    <ProductCard
                      id={meal.idMeal}
                      key={meal.idMeal}
                      name={meal.strMeal}
                      additionalInfo={AdditionalInfoMaker(
                        meal.strCategory,
                        meal.strArea,
                      )}
                      thumb={meal.strMealThumb}
                      onInfoClick={redirectToMealPage}
                      action={() => {
                        if (isFavourite) {
                          removeMealFromFavourite(meal.idMeal);
                        } else {
                          addMealToFavourite(meal);
                        }
                      }}
                      actionText={isFavourite ? "Remove" : "Add"}
                      isFavourite={isFavourite}
                    />
                  );
                })}
              </div>
              <div className="flex justify-center mt-6">
                {pageCount > 0 ? (
                  <Pagination
                    pageCount={pageCount}
                    handlePageChange={handlePageChange}
                  />
                ) : (
                  <div>Empty data</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
