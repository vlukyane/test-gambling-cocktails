import { create } from 'zustand';
import { Cocktail, CocktailCode } from '../types/cocktail';
import { getCocktails } from '../api/cocktailService';

interface CocktailStore {
  cocktails: Record<CocktailCode, Cocktail[]>;
  loading: boolean;
  error: string | null;
  fetchCocktails: (code: CocktailCode) => Promise<void>;
}

export const useCocktailStore = create<CocktailStore>((set) => ({
  cocktails: {
    margarita: [],
    mojito: [],
    a1: [],
    kir: [],
  },
  loading: false,
  error: null,
  fetchCocktails: async (code) => {
    try {
      set({ loading: true, error: null });
      const response = await getCocktails(code);
      
      if (!response.drinks) {
        throw new Error('No cocktails found');
      }

      set((state) => ({
        cocktails: {
          ...state.cocktails,
          [code]: response.drinks || [],
        },
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      });
    }
  },
})); 