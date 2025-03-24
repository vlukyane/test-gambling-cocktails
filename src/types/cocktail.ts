export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strCategory: string;
  strGlass: string;
  strAlcoholic: string;
  [key: string]: string | null;
}

export interface CocktailsResponse {
  drinks: Cocktail[] | null;
}

export type CocktailCode = 'margarita' | 'mojito' | 'a1' | 'kir'; 