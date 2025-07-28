var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { defineComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext, readonly } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrGetDynamicModelProps } from "vue/server-renderer";
import { Primitive } from "reka-ui";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useVModel } from "@vueuse/core";
import { defineStore, storeToRefs } from "pinia";
import "hookable";
import { b as useUIStore } from "../server.mjs";
import Dexie from "dexie";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        "as-child": _ctx.asChild,
        class: unref(cn)(unref(buttonVariants)({ variant: _ctx.variant, size: _ctx.size }), props.class)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/button/Button.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded px-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    modelValue: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: props.defaultValue
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        class: unref(cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", props.class)
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(modelValue)))))}>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input/Input.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useCategoriesStore = defineStore("categories", {
  state: () => ({
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
      return state.categories.filter(
        (cat) => cat.order < 10
        // Les catégories de dépenses ont order < 10
      );
    },
    incomeCategories: (state) => {
      return state.categories.filter(
        (cat) => cat.order >= 10 && cat.order < 90
        // Les catégories de revenus ont order 10-89
      );
    },
    // Categories avec sous-catégories
    categoriesTree: (state) => {
      const categories = state.categories;
      const tree = categories.filter((cat) => !cat.parentId);
      return tree.map((parent) => ({
        ...parent,
        children: categories.filter((cat) => cat.parentId === parent.id)
      }));
    },
    // Options pour les selects
    categoryOptions: (state) => {
      return state.categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
        icon: cat.icon,
        color: cat.color,
        description: cat.description
      }));
    },
    tagOptions: (state) => {
      return state.tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
        color: tag.color
      }));
    },
    // Recherche de catégorie par ID
    getCategoryById: (state) => (id) => {
      return state.categories.find((cat) => cat.id === id);
    },
    // Recherche de tag par ID
    getTagById: (state) => (id) => {
      return state.tags.find((tag) => tag.id === id);
    },
    // Categories par couleur (pour l'affichage)
    categoriesByColor: (state) => {
      const colorMap = /* @__PURE__ */ new Map();
      state.categories.forEach((cat) => {
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
        const { DEFAULT_CATEGORIES } = await import("./categories-yYp2GKXf.js");
        const defaultCategories = DEFAULT_CATEGORIES.map((cat, index) => ({
          ...cat,
          id: `default-${index}`,
          createdAt: /* @__PURE__ */ new Date()
        }));
        this.categories = defaultCategories;
      } catch (error) {
        this.error = "Impossible de charger les catégories par défaut";
        console.error("Erreur initialisation catégories:", error);
      } finally {
        this.isLoading = false;
      }
    },
    // Ajouter une catégorie
    addCategory(categoryData) {
      this.error = null;
      try {
        const newCategory = {
          ...categoryData,
          id: `custom-${Date.now()}`,
          createdAt: /* @__PURE__ */ new Date()
        };
        if (!newCategory.name.trim()) {
          throw new Error("Le nom de la catégorie est requis");
        }
        if (this.categories.some((cat) => cat.name.toLowerCase() === newCategory.name.toLowerCase())) {
          throw new Error("Une catégorie avec ce nom existe déjà");
        }
        this.categories.push(newCategory);
        return newCategory;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur lors de l'ajout";
        throw error;
      }
    },
    // Mettre à jour une catégorie
    updateCategory(id, updates) {
      this.error = null;
      try {
        const index = this.categories.findIndex((cat) => cat.id === id);
        if (index === -1) {
          throw new Error("Catégorie introuvable");
        }
        if (this.categories[index].isDefault && updates.isDefault === false) {
          throw new Error("Impossible de modifier une catégorie système");
        }
        this.categories[index] = {
          ...this.categories[index],
          ...updates
        };
        return this.categories[index];
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur lors de la mise à jour";
        throw error;
      }
    },
    // Supprimer une catégorie
    deleteCategory(id) {
      this.error = null;
      try {
        const category = this.categories.find((cat) => cat.id === id);
        if (!category) {
          throw new Error("Catégorie introuvable");
        }
        if (category.isDefault) {
          throw new Error("Impossible de supprimer une catégorie par défaut");
        }
        this.categories = this.categories.filter((cat) => cat.id !== id);
        return true;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur lors de la suppression";
        throw error;
      }
    },
    // Ajouter un tag
    addTag(tagData) {
      this.error = null;
      try {
        const newTag = {
          ...tagData,
          id: `tag-${Date.now()}`,
          createdAt: /* @__PURE__ */ new Date()
        };
        if (!newTag.name.trim()) {
          throw new Error("Le nom du tag est requis");
        }
        if (this.tags.some((tag) => tag.name.toLowerCase() === newTag.name.toLowerCase())) {
          throw new Error("Un tag avec ce nom existe déjà");
        }
        this.tags.push(newTag);
        return newTag;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur lors de l'ajout du tag";
        throw error;
      }
    },
    // Supprimer un tag
    deleteTag(id) {
      this.error = null;
      this.tags = this.tags.filter((tag) => tag.id !== id);
    },
    // Charger les données depuis le stockage
    loadData(data) {
      this.isLoading = true;
      this.error = null;
      try {
        this.categories = data.categories.map((cat) => ({
          ...cat,
          createdAt: cat.createdAt instanceof Date ? cat.createdAt : new Date(cat.createdAt)
        }));
        this.tags = data.tags.map((tag) => ({
          ...tag,
          createdAt: tag.createdAt instanceof Date ? tag.createdAt : new Date(tag.createdAt)
        }));
        if (this.categories.length === 0) {
          this.initializeDefaultCategories();
        }
      } catch (error) {
        this.error = "Erreur lors du chargement des catégories";
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
    getCategoryStats(categoryId, movements) {
      const category = this.getCategoryById(categoryId);
      if (!category) return null;
      const categoryMovements = movements.filter((m) => m.categoryId === categoryId);
      const totalAmount = categoryMovements.reduce((sum, m) => sum + Math.abs(m.amount), 0);
      const allMovementsTotal = movements.reduce((sum, m) => sum + Math.abs(m.amount), 0);
      return {
        categoryId,
        category,
        totalAmount,
        percentage: allMovementsTotal > 0 ? totalAmount / allMovementsTotal * 100 : 0,
        movementCount: categoryMovements.length,
        avgAmount: categoryMovements.length > 0 ? totalAmount / categoryMovements.length : 0,
        trend: "stable",
        // TODO: Calculer la tendance
        trendPercentage: 0
      };
    }
  }
});
const useMovementsStore = defineStore("movements", {
  state: () => ({
    movements: [],
    isLoading: false,
    error: null
  }),
  getters: {
    // Mouvements triés par date (plus récents en premier)
    sortedMovements: (state) => {
      return [...state.movements].sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    },
    // Mouvements par type
    expenseMovements: (state) => state.movements.filter((m) => m.type === "expense"),
    incomeMovements: (state) => state.movements.filter((m) => m.type === "income"),
    // Mouvements récurrents
    recurrentMovements: (state) => state.movements.filter((m) => m.isRecurrent),
    // Total des mouvements
    totalMovements: (state) => state.movements.length,
    // Mouvement par ID
    getMovementById: (state) => (id) => state.movements.find((m) => m.id === id)
  },
  actions: {
    // Ajouter un mouvement
    addMovement(newMovement) {
      this.error = null;
      try {
        const date = typeof newMovement.date === "string" ? new Date(newMovement.date) : newMovement.date;
        if (isNaN(date.getTime())) {
          throw new Error("Date invalide");
        }
        const movement = {
          id: Date.now() + Math.random(),
          // ID plus unique
          name: newMovement.name.trim(),
          amount: Number(newMovement.amount),
          date,
          type: newMovement.type,
          isRecurrent: newMovement.isRecurrent,
          imageUrl: newMovement.imageUrl || void 0
        };
        if (!movement.name) {
          throw new Error("Le nom est requis");
        }
        if (movement.amount <= 0) {
          throw new Error("Le montant doit être positif");
        }
        this.movements.push(movement);
        return movement;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur lors de l'ajout";
        throw error;
      }
    },
    // Mettre à jour un mouvement
    updateMovement(updatedMovement) {
      this.error = null;
      try {
        const index = this.movements.findIndex((m) => m.id === updatedMovement.id);
        if (index === -1) {
          throw new Error("Mouvement introuvable");
        }
        if (!updatedMovement.name.trim()) {
          throw new Error("Le nom est requis");
        }
        if (updatedMovement.amount <= 0) {
          throw new Error("Le montant doit être positif");
        }
        if (isNaN(updatedMovement.date.getTime())) {
          throw new Error("Date invalide");
        }
        this.movements[index] = {
          ...updatedMovement,
          name: updatedMovement.name.trim(),
          amount: Number(updatedMovement.amount)
        };
        return true;
      } catch (error) {
        this.error = error instanceof Error ? error.message : "Erreur lors de la mise à jour";
        return false;
      }
    },
    // Supprimer un mouvement
    deleteMovement(id) {
      this.error = null;
      const index = this.movements.findIndex((m) => m.id === id);
      if (index === -1) {
        this.error = "Mouvement introuvable";
        return false;
      }
      this.movements.splice(index, 1);
      return true;
    },
    // Supprimer tous les mouvements
    clearAllMovements() {
      this.movements = [];
      this.error = null;
    },
    // Charger les mouvements (pour la persistance)
    loadMovements(movements) {
      this.isLoading = true;
      this.error = null;
      try {
        this.movements = movements.map((m) => {
          var _a;
          return {
            ...m,
            id: m.id || Date.now() + Math.random(),
            // S'assurer qu'il y a un ID
            date: m.date instanceof Date ? m.date : new Date(m.date),
            amount: Number(m.amount),
            name: ((_a = m.name) == null ? void 0 : _a.trim()) || "",
            // Nettoyer les URLs blob
            imageUrl: m.imageUrl && m.imageUrl.startsWith("blob:") ? void 0 : m.imageUrl
          };
        }).filter(
          (m) => m.id !== void 0 && m.id !== null && m.name && !isNaN(m.amount) && m.amount > 0 && !isNaN(m.date.getTime())
        );
      } catch (error) {
        this.error = "Erreur lors du chargement des données";
        this.movements = [];
      } finally {
        this.isLoading = false;
      }
    },
    // Réinitialiser l'état d'erreur
    clearError() {
      this.error = null;
    }
  }
});
const useFinanceStore = defineStore("finance", {
  getters: {
    // Générer les récurrences pour une période donnée
    getMovementsWithRecurrences: () => {
      return (startDate, endDate) => {
        const movementsStore = useMovementsStore();
        if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error("Dates invalides:", { startDate, endDate });
          return [...movementsStore.movements];
        }
        try {
          const result = [...movementsStore.movements];
          movementsStore.recurrentMovements.forEach((movement) => {
            const originalDate = new Date(movement.date);
            if (isNaN(originalDate.getTime())) {
              console.error("Date invalide pour le mouvement récurrent:", movement);
              return;
            }
            let currentDate = new Date(originalDate);
            currentDate.setMonth(currentDate.getMonth() + 1);
            while (currentDate <= endDate) {
              if (currentDate >= startDate) {
                const clonedMovement = {
                  ...movement,
                  id: movement.id + currentDate.getTime(),
                  // ID unique
                  date: new Date(currentDate),
                  isGeneratedRecurrence: true
                };
                result.push(clonedMovement);
              }
              currentDate = new Date(currentDate);
              currentDate.setMonth(currentDate.getMonth() + 1);
            }
          });
          return result;
        } catch (error) {
          console.error("Erreur lors de la génération des récurrences:", error);
          return [...movementsStore.movements];
        }
      };
    },
    // Mouvements d'un mois spécifique
    getMonthMovements: () => {
      return (date) => {
        if (!date || isNaN(date.getTime())) {
          console.error("Date invalide:", date);
          return [];
        }
        try {
          const year = date.getFullYear();
          const month = date.getMonth();
          const startDate = new Date(year, month, 1);
          const endDate = new Date(year, month + 1, 0);
          const financeStore = useFinanceStore();
          const allMovements = financeStore.getMovementsWithRecurrences(startDate, endDate);
          return allMovements.filter((movement) => {
            const movementDate = movement.date instanceof Date ? movement.date : new Date(movement.date);
            if (isNaN(movementDate.getTime())) {
              return false;
            }
            return movementDate.getMonth() === date.getMonth() && movementDate.getFullYear() === date.getFullYear();
          });
        } catch (error) {
          console.error("Erreur lors de la récupération des mouvements du mois:", error);
          return [];
        }
      };
    },
    // Mouvements d'un jour spécifique
    getDayMovements: () => {
      return (date) => {
        if (!date || isNaN(date.getTime())) {
          console.error("Date invalide:", date);
          return [];
        }
        try {
          const sixMonthsLater = new Date(date);
          sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
          const financeStore = useFinanceStore();
          const allMovements = financeStore.getMovementsWithRecurrences(date, sixMonthsLater);
          return allMovements.filter((movement) => {
            const movementDate = movement.date instanceof Date ? movement.date : new Date(movement.date);
            if (isNaN(movementDate.getTime())) {
              return false;
            }
            return movementDate.getDate() === date.getDate() && movementDate.getMonth() === date.getMonth() && movementDate.getFullYear() === date.getFullYear();
          });
        } catch (error) {
          console.error("Erreur lors de la récupération des mouvements du jour:", error);
          return [];
        }
      };
    },
    // Calculs financiers pour un mois
    getMonthCalculations: () => {
      return (date) => {
        const financeStore = useFinanceStore();
        const monthMovements = financeStore.getMonthMovements(date);
        const income = monthMovements.filter((m) => m.type === "income").reduce((total, m) => total + Math.abs(m.amount), 0);
        const expenses = monthMovements.filter((m) => m.type === "expense").reduce((total, m) => total + Math.abs(m.amount), 0);
        const recurrent = monthMovements.filter((m) => m.isRecurrent || m.isGeneratedRecurrence).reduce((total, m) => total + Math.abs(m.amount), 0);
        return {
          totalBalance: income - expenses,
          monthlyIncome: income,
          monthlyExpenses: expenses,
          monthlyBalance: income - expenses,
          recurrentAmount: recurrent
        };
      };
    },
    // Solde total général
    getTotalBalance: () => {
      const movementsStore = useMovementsStore();
      return movementsStore.movements.reduce((total, movement) => {
        const amount = movement.type === "expense" ? -Math.abs(movement.amount) : Math.abs(movement.amount);
        return total + amount;
      }, 0);
    }
  }
});
class SavrDatabase extends Dexie {
  constructor() {
    super("SavrDB");
    __publicField(this, "movements");
    __publicField(this, "settings");
    __publicField(this, "categories");
    __publicField(this, "tags");
    this.version(1).stores({
      movements: "id, name, amount, date, type, isRecurrent, imageUrl",
      settings: "++id, key, value, updatedAt"
    });
    this.version(2).stores({
      movements: "id, name, amount, date, type, isRecurrent, imageUrl, isGeneratedRecurrence",
      settings: "++id, key, value, updatedAt"
    }).upgrade((tx) => {
      return tx.table("movements").toCollection().modify((movement) => {
        movement.isGeneratedRecurrence = false;
      });
    });
    this.version(3).stores({
      movements: "id, name, amount, date, type, isRecurrent, imageUrl, isGeneratedRecurrence, categoryId",
      settings: "++id, key, value, updatedAt",
      categories: "id, name, order, isDefault",
      tags: "id, name"
    }).upgrade((tx) => {
      return tx.table("movements").toCollection().modify((movement) => {
        movement.categoryId = null;
        movement.tags = [];
        movement.description = null;
      });
    });
  }
}
const db = new SavrDatabase();
class MovementsService {
  // Sauvegarder tous les mouvements
  static async saveMovements(movements) {
    try {
      const storedMovements = movements.map((m) => {
        const date = m.date instanceof Date ? m.date : new Date(m.date);
        return {
          ...m,
          date: date.toISOString()
        };
      });
      await db.transaction("rw", db.movements, async () => {
        await db.movements.clear();
        await db.movements.bulkAdd(storedMovements);
      });
    } catch (error) {
      console.error("Erreur sauvegarde mouvements:", error);
      throw new Error("Impossible de sauvegarder les mouvements");
    }
  }
  // Charger tous les mouvements
  static async loadMovements() {
    try {
      const storedMovements = await db.movements.toArray();
      return storedMovements.map((m) => ({
        ...m,
        date: new Date(m.date)
      }));
    } catch (error) {
      console.error("Erreur chargement mouvements:", error);
      throw new Error("Impossible de charger les mouvements");
    }
  }
  // Ajouter un mouvement
  static async addMovement(movement) {
    try {
      const date = movement.date instanceof Date ? movement.date : new Date(movement.date);
      const storedMovement = {
        ...movement,
        date: date.toISOString()
      };
      await db.movements.add(storedMovement);
    } catch (error) {
      console.error("Erreur ajout mouvement:", error);
      throw new Error("Impossible d'ajouter le mouvement");
    }
  }
  // Mettre à jour un mouvement
  static async updateMovement(movement) {
    try {
      const date = movement.date instanceof Date ? movement.date : new Date(movement.date);
      const storedMovement = {
        ...movement,
        date: date.toISOString()
      };
      await db.movements.update(movement.id, storedMovement);
    } catch (error) {
      console.error("Erreur mise à jour mouvement:", error);
      throw new Error("Impossible de mettre à jour le mouvement");
    }
  }
  // Supprimer un mouvement
  static async deleteMovement(id) {
    try {
      await db.movements.delete(id);
    } catch (error) {
      console.error("Erreur suppression mouvement:", error);
      throw new Error("Impossible de supprimer le mouvement");
    }
  }
  // Vider tous les mouvements
  static async clearAllMovements() {
    try {
      await db.movements.clear();
    } catch (error) {
      console.error("Erreur vidage mouvements:", error);
      throw new Error("Impossible de vider les mouvements");
    }
  }
}
class SettingsService {
  // Sauvegarder un paramètre
  static async saveSetting(key, value) {
    try {
      const existing = await db.settings.where("key").equals(key).first();
      const setting = {
        key,
        value,
        updatedAt: /* @__PURE__ */ new Date()
      };
      if (existing) {
        await db.settings.update(existing.id, setting);
      } else {
        await db.settings.add(setting);
      }
    } catch (error) {
      console.error("Erreur sauvegarde paramètre:", error);
      throw new Error(`Impossible de sauvegarder le paramètre ${key}`);
    }
  }
  // Charger un paramètre
  static async loadSetting(key, defaultValue) {
    try {
      const setting = await db.settings.where("key").equals(key).first();
      return setting ? setting.value : defaultValue;
    } catch (error) {
      console.error("Erreur chargement paramètre:", error);
      return defaultValue;
    }
  }
  // Charger tous les paramètres
  static async loadAllSettings() {
    try {
      const settings = await db.settings.toArray();
      return settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {});
    } catch (error) {
      console.error("Erreur chargement paramètres:", error);
      return {};
    }
  }
  // Supprimer un paramètre
  static async deleteSetting(key) {
    try {
      await db.settings.where("key").equals(key).delete();
    } catch (error) {
      console.error("Erreur suppression paramètre:", error);
      throw new Error(`Impossible de supprimer le paramètre ${key}`);
    }
  }
}
class MigrationService {
  // Migrer les données depuis localStorage
  static async migrateFromLocalStorage() {
    {
      return { movements: 0, settings: 0 };
    }
  }
  // Vérifier si une migration est nécessaire
  static needsMigration() {
    return false;
  }
  // Exporter toutes les données pour sauvegarde
  static async exportData() {
    try {
      const movements = await MovementsService.loadMovements();
      const settings = await SettingsService.loadAllSettings();
      return {
        movements,
        settings,
        exportDate: (/* @__PURE__ */ new Date()).toISOString(),
        version: "1.0"
      };
    } catch (error) {
      console.error("Erreur export données:", error);
      throw new Error("Impossible d'exporter les données");
    }
  }
  // Importer des données depuis une sauvegarde
  static async importData(data) {
    try {
      await db.transaction("rw", [db.movements, db.settings], async () => {
        var _a;
        if ((_a = data.movements) == null ? void 0 : _a.length) {
          await MovementsService.saveMovements(data.movements);
        }
        if (data.settings) {
          for (const [key, value] of Object.entries(data.settings)) {
            await SettingsService.saveSetting(key, value);
          }
        }
      });
    } catch (error) {
      console.error("Erreur import données:", error);
      throw new Error("Impossible d'importer les données");
    }
  }
}
function useFinance() {
  const movementsStore = useMovementsStore();
  const financeStore = useFinanceStore();
  const uiStore = useUIStore();
  const { movements, isLoading, error } = storeToRefs(movementsStore);
  const initializeData = async () => {
    try {
      uiStore.setLoading(true, "Rechargement des données...");
      const loadedMovements = await MovementsService.loadMovements();
      movementsStore.loadMovements(loadedMovements);
    } catch (error2) {
      console.error("Erreur initialisation:", error2);
      uiStore.showError(
        "Erreur de chargement",
        "Impossible de charger vos données."
      );
    } finally {
      uiStore.setLoading(false);
    }
  };
  const autoSave = async () => {
    try {
      await MovementsService.saveMovements(movements.value);
    } catch (error2) {
      console.error("Erreur sauvegarde automatique:", error2);
      uiStore.showError(
        "Erreur de sauvegarde",
        "Vos modifications n'ont pas pu être sauvegardées automatiquement."
      );
    }
  };
  const addMovement = async (newMovement) => {
    try {
      uiStore.clearNotifications();
      const movement = movementsStore.addMovement(newMovement);
      await autoSave();
      uiStore.showSuccess("Mouvement ajouté", `${movement.name} a été ajouté avec succès`);
      return true;
    } catch (error2) {
      const message = error2 instanceof Error ? error2.message : "Erreur inconnue";
      uiStore.showError("Erreur d'ajout", message);
      return false;
    }
  };
  const updateMovement = async (updatedMovement) => {
    try {
      uiStore.clearNotifications();
      const success = movementsStore.updateMovement(updatedMovement);
      if (success) {
        await autoSave();
        uiStore.showSuccess("Mouvement modifié", "Les modifications ont été sauvegardées");
        return true;
      }
      return false;
    } catch (error2) {
      const message = error2 instanceof Error ? error2.message : "Erreur inconnue";
      uiStore.showError("Erreur de modification", message);
      return false;
    }
  };
  const deleteMovement = async (id) => {
    try {
      uiStore.clearNotifications();
      const success = movementsStore.deleteMovement(id);
      if (success) {
        await autoSave();
        uiStore.showSuccess("Mouvement supprimé", "Le mouvement a été supprimé avec succès");
        return true;
      }
      return false;
    } catch (error2) {
      const message = error2 instanceof Error ? error2.message : "Erreur inconnue";
      uiStore.showError("Erreur de suppression", message);
      return false;
    }
  };
  const getMonthMovements = (date) => financeStore.getMonthMovements(date);
  const getDayMovements = (date) => financeStore.getDayMovements(date);
  const getMonthBalance = (date) => financeStore.getMonthCalculations(date).monthlyBalance;
  const getIncomeExpenseForMonth = (date) => {
    const calc = financeStore.getMonthCalculations(date);
    return {
      income: calc.monthlyIncome,
      expense: calc.monthlyExpenses
    };
  };
  const getTotalBalance = () => financeStore.getTotalBalance;
  const exportData = async () => {
    try {
      uiStore.setLoading(true, "Export en cours...");
      const data = await MigrationService.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
      });
      const url = URL.createObjectURL(blob);
      const a = (void 0).createElement("a");
      a.href = url;
      a.download = `savr-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      uiStore.showSuccess("Export réussi", "Vos données ont été exportées avec succès");
    } catch (error2) {
      uiStore.showError("Erreur d'export", "Impossible d'exporter vos données");
    } finally {
      uiStore.setLoading(false);
    }
  };
  const importData = async (file) => {
    try {
      uiStore.setLoading(true, "Import en cours...");
      const text = await file.text();
      const data = JSON.parse(text);
      await MigrationService.importData(data);
      await initializeData();
      uiStore.showSuccess("Import réussi", "Vos données ont été importées avec succès");
    } catch (error2) {
      uiStore.showError("Erreur d'import", "Format de fichier invalide ou données corrompues");
    } finally {
      uiStore.setLoading(false);
    }
  };
  return {
    // État
    movements: readonly(movements),
    isLoading: readonly(isLoading),
    error: readonly(error),
    // Actions
    addMovement,
    updateMovement,
    deleteMovement,
    // Calculs
    getMonthMovements,
    getDayMovements,
    getMonthBalance,
    getIncomeExpenseForMonth,
    getTotalBalance,
    // Utilitaires
    initializeData,
    exportData,
    importData
  };
}
export {
  _sfc_main$1 as _,
  _sfc_main as a,
  useFinance as b,
  cn as c,
  useCategoriesStore as u
};
//# sourceMappingURL=useFinance-BLxJwmk-.js.map
