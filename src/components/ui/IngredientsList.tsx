import { Ingredient } from "@/interfaces/Meal";

interface IngredientsListProps {
  ingredients: Ingredient[];
  headText?: string;
}

export const IngredientsList = ({
  ingredients,
  headText = "Ingredients",
}: IngredientsListProps) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-semibold mb-4">{headText}</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">{ingredient.name}</span> -{" "}
          <span>{ingredient.measure}</span>
        </div>
      ))}
    </div>
  );
};
