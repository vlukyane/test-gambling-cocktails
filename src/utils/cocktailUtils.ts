import { Cocktail } from '../types/cocktail';

interface Ingredient {
  ingredient: string;
  measure: string | null;
}

export const getCocktailIngredients = (cocktail: Cocktail): Ingredient[] => {
  return Object.entries(cocktail)
    .filter(([key, value]) => 
      key.startsWith('strIngredient') && typeof value === 'string'
    )
    .map(([key, value]) => {
      const measureKey = key.replace('Ingredient', 'Measure');
      const measure = cocktail[measureKey];
      return { 
        ingredient: value as string,
        measure 
      };
    });
}; 