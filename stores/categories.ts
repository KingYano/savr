import { defineStore } from 'pinia';
import type { Category, Tag, DEFAULT_CATEGORIES, CategoryStats } from '~/types/categories';
import type { Movement } from '~/types/finance';

export interface CategoriesState {
  categories: Category[];
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
}

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoriesState => ({
    categories: [],
    tags: [],
    isLoading: false,
    error: null
  }),

  getters: {
    // Categories triées par ordre
    sortedCategories: (state) => {
      return [...state.categories].sort((a, b) => a.order - b.order);
    },

    // Categories par type (pour les revenus/dépenses)
    expenseCategories: (state) => {
      return state.categories.filter(cat => 
        cat.order < 10 // Les catégories de dépenses ont order < 10
      );
    },

    incomeCategories: (state) => {
      return state.categories.filter(cat => 
        cat.order >= 10 && cat.order < 90 // Les catégories de revenus ont order 10-89
      );
    },

    // Categories avec sous-catégories
    categoriesTree: (state) => {
      const categories = state.categories;
      const tree = categories.filter(cat => !cat.parentId);
      
      return tree.map(parent => ({
        ...parent,
        children: categories.filter(cat => cat.parentId === parent.id)
      }));
    },

    // Options pour les selects
    categoryOptions: (state) => {
      return state.categories.map(cat => ({
        value: cat.id,
        label: cat.name,
        icon: cat.icon,
        color: cat.color,
        description: cat.description
      }));
    },

    tagOptions: (state) => {
      return state.tags.map(tag => ({
        value: tag.id,
        label: tag.name,
        color: tag.color
      }));
    },

    // Recherche de catégorie par ID
    getCategoryById: (state) => (id: string) => {
      return state.categories.find(cat => cat.id === id);
    },

    // Recherche de tag par ID
    getTagById: (state) => (id: string) => {
      return state.tags.find(tag => tag.id === id);
    },

    // Categories par couleur (pour l'affichage)
    categoriesByColor: (state) => {
      const colorMap = new Map<string, Category[]>();
      state.categories.forEach(cat => {
        const existing = colorMap.get(cat.color) || [];
        existing.push(cat);
        colorMap.set(cat.color, existing);
      });
      return colorMap;
    }
  },

  actions: {
    // Initialiser avec les catégories par défaut
    async initializeDefaultCategories() {
      this.isLoading = true;
      this.error = null;

      try {
        const { DEFAULT_CATEGORIES } = await import('~/types/categories');
        
        const defaultCategories: Category[] = DEFAULT_CATEGORIES.map((cat, index) => ({
          ...cat,
          id: `default-${index}`,
          createdAt: new Date()
        }));

        this.categories = defaultCategories;
      } catch (error) {
        this.error = 'Impossible de charger les catégories par défaut';
        console.error('Erreur initialisation catégories:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // Ajouter une catégorie
    addCategory(categoryData: Omit<Category, 'id' | 'createdAt'>) {
      this.error = null;

      try {
        const newCategory: Category = {
          ...categoryData,
          id: `custom-${Date.now()}`,
          createdAt: new Date()
        };

        // Validation
        if (!newCategory.name.trim()) {
          throw new Error('Le nom de la catégorie est requis');
        }

        if (this.categories.some(cat => cat.name.toLowerCase() === newCategory.name.toLowerCase())) {
          throw new Error('Une catégorie avec ce nom existe déjà');
        }

        this.categories.push(newCategory);
        return newCategory;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erreur lors de l\'ajout';
        throw error;
      }
    },

    // Mettre à jour une catégorie
    updateCategory(id: string, updates: Partial<Category>) {
      this.error = null;

      try {
        const index = this.categories.findIndex(cat => cat.id === id);
        if (index === -1) {
          throw new Error('Catégorie introuvable');
        }

        // Ne pas permettre la modification des catégories par défaut système
        if (this.categories[index].isDefault && updates.isDefault === false) {
          throw new Error('Impossible de modifier une catégorie système');
        }

        this.categories[index] = {
          ...this.categories[index],
          ...updates
        };

        return this.categories[index];
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erreur lors de la mise à jour';
        throw error;
      }
    },

    // Supprimer une catégorie
    deleteCategory(id: string) {
      this.error = null;

      try {
        const category = this.categories.find(cat => cat.id === id);
        if (!category) {
          throw new Error('Catégorie introuvable');
        }

        if (category.isDefault) {
          throw new Error('Impossible de supprimer une catégorie par défaut');
        }

        this.categories = this.categories.filter(cat => cat.id !== id);
        return true;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erreur lors de la suppression';
        throw error;
      }
    },

    // Ajouter un tag
    addTag(tagData: Omit<Tag, 'id' | 'createdAt'>) {
      this.error = null;

      try {
        const newTag: Tag = {
          ...tagData,
          id: `tag-${Date.now()}`,
          createdAt: new Date()
        };

        if (!newTag.name.trim()) {
          throw new Error('Le nom du tag est requis');
        }

        if (this.tags.some(tag => tag.name.toLowerCase() === newTag.name.toLowerCase())) {
          throw new Error('Un tag avec ce nom existe déjà');
        }

        this.tags.push(newTag);
        return newTag;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erreur lors de l\'ajout du tag';
        throw error;
      }
    },

    // Supprimer un tag
    deleteTag(id: string) {
      this.error = null;
      this.tags = this.tags.filter(tag => tag.id !== id);
    },

    // Charger les données depuis le stockage
    loadData(data: { categories: Category[]; tags: Tag[] }) {
      this.isLoading = true;
      this.error = null;

      try {
        this.categories = data.categories.map(cat => ({
          ...cat,
          createdAt: cat.createdAt instanceof Date ? cat.createdAt : new Date(cat.createdAt)
        }));

        this.tags = data.tags.map(tag => ({
          ...tag,
          createdAt: tag.createdAt instanceof Date ? tag.createdAt : new Date(tag.createdAt)
        }));

        // Si aucune catégorie, initialiser avec les défaults
        if (this.categories.length === 0) {
          this.initializeDefaultCategories();
        }
      } catch (error) {
        this.error = 'Erreur lors du chargement des catégories';
        this.categories = [];
        this.tags = [];
        this.initializeDefaultCategories();
      } finally {
        this.isLoading = false;
      }
    },

    // Réinitialiser l'erreur
    clearError() {
      this.error = null;
    },

    // Obtenir les statistiques d'une catégorie
    getCategoryStats(categoryId: string, movements: Movement[]): CategoryStats | null {
      const category = this.getCategoryById(categoryId);
      if (!category) return null;

      const categoryMovements = movements.filter(m => m.categoryId === categoryId);
      const totalAmount = categoryMovements.reduce((sum, m) => sum + Math.abs(m.amount), 0);
      const allMovementsTotal = movements.reduce((sum, m) => sum + Math.abs(m.amount), 0);

      return {
        categoryId,
        category,
        totalAmount,
        percentage: allMovementsTotal > 0 ? (totalAmount / allMovementsTotal) * 100 : 0,
        movementCount: categoryMovements.length,
        avgAmount: categoryMovements.length > 0 ? totalAmount / categoryMovements.length : 0,
        trend: 'stable', // TODO: Calculer la tendance
        trendPercentage: 0
      };
    }
  }
});