import { storeToRefs } from 'pinia';
import { useMovementsStore } from '~/stores/movements';
import { useFinanceStore } from '~/stores/finance';
import { useUIStore } from '~/stores/ui';
import { MovementsService, MigrationService } from '~/utils/database';
import type { Movement, NewMovement } from '~/types/finance';

/**
 * Composable principal pour la gestion financière
 * Fait le pont entre les stores Pinia et les composants
 */
export function useFinance() {
  const movementsStore = useMovementsStore();
  const financeStore = useFinanceStore();
  const uiStore = useUIStore();

  // Refs réactives depuis les stores
  const { movements, isLoading, error } = storeToRefs(movementsStore);

  // Initialisation manuelle des données (pour les cas spéciaux)
  const initializeData = async () => {
    try {
      uiStore.setLoading(true, 'Rechargement des données...');
      const loadedMovements = await MovementsService.loadMovements();
      movementsStore.loadMovements(loadedMovements);
    } catch (error) {
      console.error('Erreur initialisation:', error);
      uiStore.showError(
        'Erreur de chargement',
        'Impossible de charger vos données.'
      );
    } finally {
      uiStore.setLoading(false);
    }
  };

  // Sauvegarder automatiquement après chaque modification
  const autoSave = async () => {
    try {
      await MovementsService.saveMovements(movements.value);
    } catch (error) {
      console.error('Erreur sauvegarde automatique:', error);
      uiStore.showError(
        'Erreur de sauvegarde',
        'Vos modifications n\'ont pas pu être sauvegardées automatiquement.'
      );
    }
  };

  // Ajouter un mouvement
  const addMovement = async (newMovement: NewMovement): Promise<boolean> => {
    try {
      uiStore.clearNotifications();
      const movement = movementsStore.addMovement(newMovement);
      await autoSave();
      
      uiStore.showSuccess('Mouvement ajouté', `${movement.name} a été ajouté avec succès`);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue';
      uiStore.showError('Erreur d\'ajout', message);
      return false;
    }
  };

  // Mettre à jour un mouvement
  const updateMovement = async (updatedMovement: Movement): Promise<boolean> => {
    try {
      uiStore.clearNotifications();
      const success = movementsStore.updateMovement(updatedMovement);
      
      if (success) {
        await autoSave();
        uiStore.showSuccess('Mouvement modifié', 'Les modifications ont été sauvegardées');
        return true;
      }
      return false;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue';
      uiStore.showError('Erreur de modification', message);
      return false;
    }
  };

  // Supprimer un mouvement
  const deleteMovement = async (id: number): Promise<boolean> => {
    try {
      uiStore.clearNotifications();
      const success = movementsStore.deleteMovement(id);
      
      if (success) {
        await autoSave();
        uiStore.showSuccess('Mouvement supprimé', 'Le mouvement a été supprimé avec succès');
        return true;
      }
      return false;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur inconnue';
      uiStore.showError('Erreur de suppression', message);
      return false;
    }
  };

  // Fonctions de calcul (délégation au store finance)
  const getMonthMovements = (date: Date) => financeStore.getMonthMovements(date);
  const getDayMovements = (date: Date) => financeStore.getDayMovements(date);
  const getMonthBalance = (date: Date) => financeStore.getMonthCalculations(date).monthlyBalance;
  const getIncomeExpenseForMonth = (date: Date) => {
    const calc = financeStore.getMonthCalculations(date);
    return {
      income: calc.monthlyIncome,
      expense: calc.monthlyExpenses
    };
  };

  // Fonctions utilitaires
  const getTotalBalance = () => financeStore.getTotalBalance;

  const exportData = async () => {
    try {
      uiStore.setLoading(true, 'Export en cours...');
      const data = await MigrationService.exportData();
      
      // Créer un fichier de téléchargement
      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `savr-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      uiStore.showSuccess('Export réussi', 'Vos données ont été exportées avec succès');
    } catch (error) {
      uiStore.showError('Erreur d\'export', 'Impossible d\'exporter vos données');
    } finally {
      uiStore.setLoading(false);
    }
  };

  const importData = async (file: File) => {
    try {
      uiStore.setLoading(true, 'Import en cours...');
      
      const text = await file.text();
      const data = JSON.parse(text);
      
      await MigrationService.importData(data);
      await initializeData(); // Recharger les données
      
      uiStore.showSuccess('Import réussi', 'Vos données ont été importées avec succès');
    } catch (error) {
      uiStore.showError('Erreur d\'import', 'Format de fichier invalide ou données corrompues');
    } finally {
      uiStore.setLoading(false);
    }
  };

  // L'initialisation est maintenant gérée par le plugin pinia.client.ts

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