// Plugin côté client pour initialiser les stores une seule fois
import { useSettingsStore } from '~/stores/settings';
import { useUIStore } from '~/stores/ui';
import { MigrationService, MovementsService } from '~/utils/database';
import { useMovementsStore } from '~/stores/movements';

let initialized = false;

export default defineNuxtPlugin(async (nuxtApp) => {
  // S'assurer que l'initialisation ne se fait qu'une seule fois
  if (initialized) return;
  initialized = true;

  // Attendre que l'app soit montée
  await nuxtApp.hooks.hook('app:mounted', async () => {
    const settingsStore = useSettingsStore();
    const uiStore = useUIStore();
    const movementsStore = useMovementsStore();

    try {
      // Charger les paramètres utilisateur
      await settingsStore.loadSettings();

      // Migration automatique si nécessaire
      if (MigrationService.needsMigration()) {
        uiStore.setLoading(true, 'Migration des données...');
        
        try {
          const migrationResult = await MigrationService.migrateFromLocalStorage();
          
          if (migrationResult.movements > 0 || migrationResult.settings > 0) {
            uiStore.showSuccess(
              'Migration réussie',
              `${migrationResult.movements} mouvements et ${migrationResult.settings} paramètres migrés`
            );
          }
        } catch (migrationError) {
          console.error('Erreur migration:', migrationError);
          uiStore.showError(
            'Erreur de migration',
            'La migration des anciennes données a échoué. Vos nouvelles données seront sauvegardées normalement.'
          );
        }
      }

      // Charger les données depuis IndexedDB
      try {
        const loadedMovements = await MovementsService.loadMovements();
        movementsStore.loadMovements(loadedMovements);
      } catch (loadError) {
        console.error('Erreur chargement:', loadError);
        uiStore.showError(
          'Erreur de chargement',
          'Impossible de charger vos données. Les données par défaut seront utilisées.'
        );
      }

    } catch (error) {
      console.error('Erreur initialisation plugin:', error);
    } finally {
      uiStore.setLoading(false);
    }
  });
});