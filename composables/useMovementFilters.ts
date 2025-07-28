import { ref, computed, watch, readonly } from 'vue';
import type { Movement } from '~/types/finance';
import type { Category, Tag } from '~/types/categories';

export interface MovementFilters {
  searchQuery: string;
  type: 'all' | 'income' | 'expense';
  categoryIds: string[];
  tagIds: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  amountRange: {
    min: number | null;
    max: number | null;
  };
  isRecurrent: 'all' | 'yes' | 'no';
}

export interface FilterStats {
  totalCount: number;
  filteredCount: number;
  totalAmount: number;
  filteredAmount: number;
  categories: Map<string, number>;
  tags: Map<string, number>;
}

export function useMovementFilters(movements: Ref<Movement[]>) {
  // État des filtres
  const filters = ref<MovementFilters>({
    searchQuery: '',
    type: 'all',
    categoryIds: [],
    tagIds: [],
    dateRange: {
      start: null,
      end: null
    },
    amountRange: {
      min: null,
      max: null
    },
    isRecurrent: 'all'
  });

  // Mouvements filtrés
  const filteredMovements = computed(() => {
    if (!movements.value || !Array.isArray(movements.value)) {
      return [];
    }
    
    // Filtrer les mouvements valides (avec un ID)
    let result = movements.value.filter(m => m && (m.id !== undefined && m.id !== null));

    // Filtre par recherche textuelle
    if (filters.value.searchQuery) {
      const query = filters.value.searchQuery.toLowerCase();
      result = result.filter(movement => 
        movement.name.toLowerCase().includes(query) ||
        movement.description?.toLowerCase().includes(query)
      );
    }

    // Filtre par type
    if (filters.value.type !== 'all') {
      result = result.filter(movement => movement.type === filters.value.type);
    }

    // Filtre par catégories
    if (filters.value.categoryIds.length > 0) {
      result = result.filter(movement => 
        movement.categoryId && filters.value.categoryIds.includes(movement.categoryId)
      );
    }

    // Filtre par tags
    if (filters.value.tagIds.length > 0) {
      result = result.filter(movement => 
        movement.tags?.some(tagId => filters.value.tagIds.includes(tagId))
      );
    }

    // Filtre par plage de dates
    if (filters.value.dateRange.start || filters.value.dateRange.end) {
      result = result.filter(movement => {
        const movementDate = movement.date instanceof Date ? movement.date : new Date(movement.date);
        
        if (filters.value.dateRange.start && movementDate < filters.value.dateRange.start) {
          return false;
        }
        
        if (filters.value.dateRange.end && movementDate > filters.value.dateRange.end) {
          return false;
        }
        
        return true;
      });
    }

    // Filtre par plage de montants
    if (filters.value.amountRange.min !== null || filters.value.amountRange.max !== null) {
      result = result.filter(movement => {
        const amount = Math.abs(movement.amount);
        
        if (filters.value.amountRange.min !== null && amount < filters.value.amountRange.min) {
          return false;
        }
        
        if (filters.value.amountRange.max !== null && amount > filters.value.amountRange.max) {
          return false;
        }
        
        return true;
      });
    }

    // Filtre par récurrence
    if (filters.value.isRecurrent !== 'all') {
      const isRecurrentFilter = filters.value.isRecurrent === 'yes';
      result = result.filter(movement => 
        (movement.isRecurrent || movement.isGeneratedRecurrence) === isRecurrentFilter
      );
    }

    // Trier par date (plus récents en premier)
    result.sort((a, b) => {
      const dateA = a.date instanceof Date ? a.date : new Date(a.date);
      const dateB = b.date instanceof Date ? b.date : new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return result;
  });

  // Statistiques des filtres
  const filterStats = computed((): FilterStats => {
    const movs = movements.value || [];
    const filtered = filteredMovements.value || [];
    
    const totalCount = movs.length;
    const filteredCount = filtered.length;
    
    const totalAmount = movs.reduce((sum, m) => sum + Math.abs(m.amount), 0);
    const filteredAmount = filtered.reduce((sum, m) => sum + Math.abs(m.amount), 0);

    // Statistiques par catégories
    const categories = new Map<string, number>();
    filtered.forEach(movement => {
      if (movement.categoryId) {
        const current = categories.get(movement.categoryId) || 0;
        categories.set(movement.categoryId, current + 1);
      }
    });

    // Statistiques par tags
    const tags = new Map<string, number>();
    filtered.forEach(movement => {
      movement.tags?.forEach(tagId => {
        const current = tags.get(tagId) || 0;
        tags.set(tagId, current + 1);
      });
    });

    return {
      totalCount,
      filteredCount,
      totalAmount,
      filteredAmount,
      categories,
      tags
    };
  });

  // Suggestions de recherche basées sur l'historique
  const searchSuggestions = computed(() => {
    if (!filters.value.searchQuery || filters.value.searchQuery.length < 2) {
      return [];
    }

    const movs = movements.value || [];
    const query = filters.value.searchQuery.toLowerCase();
    const suggestions = new Set<string>();

    movs.forEach(movement => {
      // Suggestions basées sur les noms
      if (movement.name.toLowerCase().includes(query)) {
        suggestions.add(movement.name);
      }

      // Suggestions basées sur les descriptions
      if (movement.description?.toLowerCase().includes(query)) {
        suggestions.add(movement.description);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  });

  // Filtres rapides prédéfinis
  const quickFilters = {
    thisMonth: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      setDateRange(start, end);
    },

    lastMonth: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      
      setDateRange(start, end);
    },

    thisYear: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31);
      
      setDateRange(start, end);
    },

    lastWeek: () => {
      const now = new Date();
      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const end = now;
      
      setDateRange(start, end);
    },

    expensesOnly: () => {
      filters.value.type = 'expense';
    },

    incomeOnly: () => {
      filters.value.type = 'income';
    },

    recurrentOnly: () => {
      filters.value.isRecurrent = 'yes';
    },

    highAmounts: () => {
      // Filtrer les montants > 100€
      filters.value.amountRange.min = 100;
    }
  };

  // Actions pour modifier les filtres
  const setSearchQuery = (query: string) => {
    filters.value.searchQuery = query;
  };

  const setType = (type: 'all' | 'income' | 'expense') => {
    filters.value.type = type;
  };

  const setCategoryIds = (categoryIds: string[]) => {
    filters.value.categoryIds = categoryIds;
  };

  const setTagIds = (tagIds: string[]) => {
    filters.value.tagIds = tagIds;
  };

  const setDateRange = (start: Date | null, end: Date | null) => {
    filters.value.dateRange.start = start;
    filters.value.dateRange.end = end;
  };

  const setAmountRange = (min: number | null, max: number | null) => {
    filters.value.amountRange.min = min;
    filters.value.amountRange.max = max;
  };

  const setRecurrentFilter = (isRecurrent: 'all' | 'yes' | 'no') => {
    filters.value.isRecurrent = isRecurrent;
  };

  // Réinitialiser tous les filtres
  const clearAllFilters = () => {
    filters.value = {
      searchQuery: '',
      type: 'all',
      categoryIds: [],
      tagIds: [],
      dateRange: {
        start: null,
        end: null
      },
      amountRange: {
        min: null,
        max: null
      },
      isRecurrent: 'all'
    };
  };

  // Réinitialiser un filtre spécifique
  const clearFilter = (filterType: keyof MovementFilters) => {
    switch (filterType) {
      case 'searchQuery':
        filters.value.searchQuery = '';
        break;
      case 'type':
        filters.value.type = 'all';
        break;
      case 'categoryIds':
        filters.value.categoryIds = [];
        break;
      case 'tagIds':
        filters.value.tagIds = [];
        break;
      case 'dateRange':
        filters.value.dateRange = { start: null, end: null };
        break;
      case 'amountRange':
        filters.value.amountRange = { min: null, max: null };
        break;
      case 'isRecurrent':
        filters.value.isRecurrent = 'all';
        break;
    }
  };

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = computed(() => {
    return (
      filters.value.searchQuery !== '' ||
      filters.value.type !== 'all' ||
      filters.value.categoryIds.length > 0 ||
      filters.value.tagIds.length > 0 ||
      filters.value.dateRange.start !== null ||
      filters.value.dateRange.end !== null ||
      filters.value.amountRange.min !== null ||
      filters.value.amountRange.max !== null ||
      filters.value.isRecurrent !== 'all'
    );
  });

  // Sauvegarder/charger les filtres (optionnel)
  const saveFiltersToStorage = () => {
    if (process.client) {
      localStorage.setItem('movementFilters', JSON.stringify(filters.value));
    }
  };

  const loadFiltersFromStorage = () => {
    if (process.client) {
      const saved = localStorage.getItem('movementFilters');
      if (saved) {
        try {
          const parsedFilters = JSON.parse(saved);
          // Reconvertir les dates
          if (parsedFilters.dateRange) {
            parsedFilters.dateRange.start = parsedFilters.dateRange.start 
              ? new Date(parsedFilters.dateRange.start) 
              : null;
            parsedFilters.dateRange.end = parsedFilters.dateRange.end 
              ? new Date(parsedFilters.dateRange.end) 
              : null;
          }
          filters.value = { ...filters.value, ...parsedFilters };
        } catch (error) {
          console.error('Erreur chargement filtres:', error);
        }
      }
    }
  };

  // Sauvegarder automatiquement les filtres
  watch(filters, () => {
    saveFiltersToStorage();
  }, { deep: true });

  return {
    // État
    filters: readonly(filters),
    filteredMovements,
    filterStats,
    searchSuggestions,
    hasActiveFilters,

    // Actions
    setSearchQuery,
    setType,
    setCategoryIds,
    setTagIds,
    setDateRange,
    setAmountRange,
    setRecurrentFilter,
    clearAllFilters,
    clearFilter,

    // Filtres rapides
    quickFilters,

    // Persistance
    saveFiltersToStorage,
    loadFiltersFromStorage
  };
}