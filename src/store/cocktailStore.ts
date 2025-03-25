import { create } from 'zustand';
import { Cocktail, CocktailCode } from '../types/cocktail';
import { getCocktails } from '../api/cocktailService';
import { COCKTAIL_CODES } from '../constants/cocktails';

interface CocktailState {
  cocktails: Record<CocktailCode, Cocktail[]>;
  loading: boolean;
  error: string | null;
  fetchCocktails: (code: CocktailCode) => Promise<void>;
}

const initialCocktails = COCKTAIL_CODES.reduce((acc, code) => {
  acc[code] = [];
  return acc;
}, {} as Record<CocktailCode, Cocktail[]>);

export const useCocktailStore = create<CocktailState>((set, get) => ({
  cocktails: initialCocktails,
  loading: false,
  error: null,

  fetchCocktails: async (code: CocktailCode) => {
    if (get().cocktails[code].length > 0) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await getCocktails(code);

      if (!response.drinks) {
        throw new Error('No cocktails found');
      }

      set((state) => ({
        cocktails: {
          ...state.cocktails,
          [code]: response.drinks,
        },
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch cocktails',
        loading: false,
      });
    }
  },
}));
