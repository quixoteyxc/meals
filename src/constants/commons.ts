export const LETTERS_ARRAY = "abcdefghijklmnopqrstuvwxyz".split("");
export const ROUTES = {
  MEAL_INFO: (id: string) => {
    return `/meal/${id}`;
  },
  FAVOURITE_MEALS: "/favourites",
};
