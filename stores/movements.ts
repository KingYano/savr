import { defineStore } from 'pinia';
import type { Movement, NewMovement } from '~/types/finance';

export interface MovementsState {
  movements: Movement[];
  isLoading: boolean;
  error: string | null;
}

export const useMovementsStore = defineStore('movements', {
  state: (): MovementsState => ({
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
    expenseMovements: (state) => state.movements.filter(m => m.type === 'expense'),
    incomeMovements: (state) => state.movements.filter(m => m.type === 'income'),
    
    // Mouvements récurrents
    recurrentMovements: (state) => state.movements.filter(m => m.isRecurrent),

    // Total des mouvements
    totalMovements: (state) => state.movements.length,

    // Mouvement par ID
    getMovementById: (state) => (id: number) => state.movements.find(m => m.id === id)
  },

  actions: {
    // Ajouter un mouvement
    addMovement(newMovement: NewMovement): Movement {
      this.error = null;
      
      try {
        const date = typeof newMovement.date === 'string'
          ? new Date(newMovement.date)
          : newMovement.date;

        if (isNaN(date.getTime())) {
          throw new Error('Date invalide');
        }

        const movement: Movement = {
          id: Date.now() + Math.random(), // ID plus unique
          name: newMovement.name.trim(),
          amount: Number(newMovement.amount),
          date,
          type: newMovement.type,
          isRecurrent: newMovement.isRecurrent,
          imageUrl: newMovement.imageUrl || undefined
        };

        // Validation
        if (!movement.name) {
          throw new Error('Le nom est requis');
        }
        if (movement.amount <= 0) {
          throw new Error('Le montant doit être positif');
        }

        this.movements.push(movement);
        return movement;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erreur lors de l\'ajout';
        throw error;
      }
    },

    // Mettre à jour un mouvement
    updateMovement(updatedMovement: Movement): boolean {
      this.error = null;
      
      try {
        const index = this.movements.findIndex(m => m.id === updatedMovement.id);
        if (index === -1) {
          throw new Error('Mouvement introuvable');
        }

        // Validation
        if (!updatedMovement.name.trim()) {
          throw new Error('Le nom est requis');
        }
        if (updatedMovement.amount <= 0) {
          throw new Error('Le montant doit être positif');
        }
        if (isNaN(updatedMovement.date.getTime())) {
          throw new Error('Date invalide');
        }

        this.movements[index] = {
          ...updatedMovement,
          name: updatedMovement.name.trim(),
          amount: Number(updatedMovement.amount)
        };

        return true;
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Erreur lors de la mise à jour';
        return false;
      }
    },

    // Supprimer un mouvement
    deleteMovement(id: number): boolean {
      this.error = null;
      
      const index = this.movements.findIndex(m => m.id === id);
      if (index === -1) {
        this.error = 'Mouvement introuvable';
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
    loadMovements(movements: Movement[]) {
      this.isLoading = true;
      this.error = null;
      
      try {
        // Validation et nettoyage des données
        this.movements = movements.map(m => ({
          ...m,
          date: m.date instanceof Date ? m.date : new Date(m.date),
          amount: Number(m.amount),
          name: m.name.trim(),
          // Nettoyer les URLs blob
          imageUrl: m.imageUrl && m.imageUrl.startsWith('blob:') ? undefined : m.imageUrl
        })).filter(m => 
          m.name && 
          !isNaN(m.amount) && 
          m.amount > 0 && 
          !isNaN(m.date.getTime())
        );
      } catch (error) {
        this.error = 'Erreur lors du chargement des données';
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