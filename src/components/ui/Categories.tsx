import { useState, useEffect } from "react";
import { MealsService } from "@/services/MealsService";

interface CategoryListProps {
  onCategoryChange: (selectedCategories: string[]) => void;
}

export default function CategoryList({ onCategoryChange }: CategoryListProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const service = new MealsService();
      try {
        const fetchedCategories = await service.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevState) => {
      const updatedCategories = prevState.includes(category)
        ? prevState.filter((item) => item !== category)
        : [...prevState, category];
      onCategoryChange(updatedCategories);
      return updatedCategories;
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching categories</div>;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
