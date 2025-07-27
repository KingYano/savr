import { defineStore } from 'pinia';
import { useMovementsStore } from './movements';
import type { Movement } from '~/types/finance';

export interface FinanceCalculations {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyBalance: number;
  recurrentAmount: number;
}

export const useFinanceStore = defineStore('finance', {
  getters: {
    // Générer les récurrences pour une période donnée
    getMovementsWithRecurrences: () => {
      return (startDate: Date, endDate: Date): Movement[] => {
        const movementsStore = useMovementsStore();
        
        if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error('Dates invalides:', { startDate, endDate });
          return [...movementsStore.movements];
        }

        try {
          const result: Movement[] = [...movementsStore.movements];

          movementsStore.recurrentMovements.forEach(movement => {
            const originalDate = new Date(movement.date);
            
            if (isNaN(originalDate.getTime())) {
              console.error('Date invalide pour le mouvement récurrent:', movement);
              return;
            }

            let currentDate = new Date(originalDate);
            currentDate.setMonth(currentDate.getMonth() + 1);

            while (currentDate <= endDate) {
              if (currentDate >= startDate) {
                const clonedMovement: Movement = {
                  ...movement,
                  id: movement.id + currentDate.getTime(), // ID unique
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
          console.error('Erreur lors de la génération des récurrences:', error);
          return [...movementsStore.movements];
        }
      };
    },

    // Mouvements d'un mois spécifique
    getMonthMovements: () => {
      return (date: Date): Movement[] => {
        if (!date || isNaN(date.getTime())) {
          console.error('Date invalide:', date);
          return [];
        }

        try {
          const year = date.getFullYear();
          const month = date.getMonth();
          const startDate = new Date(year, month, 1);
          const endDate = new Date(year, month + 1, 0);

          const financeStore = useFinanceStore();
          const allMovements = financeStore.getMovementsWithRecurrences(startDate, endDate);

          return allMovements.filter(movement => {
            const movementDate = movement.date instanceof Date
              ? movement.date
              : new Date(movement.date);

            if (isNaN(movementDate.getTime())) {
              return false;
            }

            return movementDate.getMonth() === date.getMonth() &&
              movementDate.getFullYear() === date.getFullYear();
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des mouvements du mois:', error);
          return [];
        }
      };
    },

    // Mouvements d'un jour spécifique
    getDayMovements: () => {
      return (date: Date): Movement[] => {
        if (!date || isNaN(date.getTime())) {
          console.error('Date invalide:', date);
          return [];
        }

        try {
          // Générer les récurrences pour les 6 prochains mois
          const sixMonthsLater = new Date(date);
          sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

          const financeStore = useFinanceStore();
          const allMovements = financeStore.getMovementsWithRecurrences(date, sixMonthsLater);

          return allMovements.filter(movement => {
            const movementDate = movement.date instanceof Date
              ? movement.date
              : new Date(movement.date);

            if (isNaN(movementDate.getTime())) {
              return false;
            }

            return movementDate.getDate() === date.getDate() &&
              movementDate.getMonth() === date.getMonth() &&
              movementDate.getFullYear() === date.getFullYear();
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des mouvements du jour:', error);
          return [];
        }
      };
    },

    // Calculs financiers pour un mois
    getMonthCalculations: () => {
      return (date: Date): FinanceCalculations => {
        const financeStore = useFinanceStore();
        const monthMovements = financeStore.getMonthMovements(date);

        const income = monthMovements
          .filter(m => m.type === 'income')
          .reduce((total, m) => total + Math.abs(m.amount), 0);

        const expenses = monthMovements
          .filter(m => m.type === 'expense')
          .reduce((total, m) => total + Math.abs(m.amount), 0);

        const recurrent = monthMovements
          .filter(m => m.isRecurrent || m.isGeneratedRecurrence)
          .reduce((total, m) => total + Math.abs(m.amount), 0);

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
        const amount = movement.type === 'expense'
          ? -Math.abs(movement.amount)
          : Math.abs(movement.amount);
        return total + amount;
      }, 0);
    }
  }
});