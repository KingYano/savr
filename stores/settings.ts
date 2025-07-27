import { defineStore } from 'pinia';

export interface UserSettings {
  isDarkMode: boolean;
  currency: string;
  dateFormat: string;
  notifications: boolean;
  autoBackup: boolean;
  language: string;
}

export interface SettingsState extends UserSettings {
  isLoading: boolean;
  lastSaved: Date | null;
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    isDarkMode: true,
    currency: 'EUR',
    dateFormat: 'fr-FR',
    notifications: true,
    autoBackup: true,
    language: 'fr',
    isLoading: false,
    lastSaved: null
  }),

  getters: {
    // Thème CSS class
    themeClass: (state) => state.isDarkMode ? 'dark' : 'light',
    
    // Configuration d'internationalisation
    localeConfig: (state) => ({
      locale: state.dateFormat,
      currency: state.currency,
      language: state.language
    }),

    // État des paramètres pour l'export
    exportableSettings: (state): UserSettings => ({
      isDarkMode: state.isDarkMode,
      currency: state.currency,
      dateFormat: state.dateFormat,
      notifications: state.notifications,
      autoBackup: state.autoBackup,
      language: state.language
    })
  },

  actions: {
    // Basculer le mode sombre
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.saveSettings();
    },

    // Mettre à jour les paramètres
    updateSettings(newSettings: Partial<UserSettings>) {
      Object.assign(this, newSettings);
      this.saveSettings();
    },

    // Sauvegarder les paramètres
    async saveSettings() {
      this.isLoading = true;
      
      try {
        // Dans une vraie app, ici on sauvegarderait en base ou API
        // Pour l'instant, on utilise localStorage
        if (process.client) {
          const settings = this.exportableSettings;
          localStorage.setItem('userSettings', JSON.stringify(settings));
          this.lastSaved = new Date();
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des paramètres:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Charger les paramètres
    async loadSettings() {
      this.isLoading = true;
      
      try {
        if (process.client) {
          const stored = localStorage.getItem('userSettings');
          if (stored) {
            const settings: UserSettings = JSON.parse(stored);
            Object.assign(this, settings);
            this.lastSaved = new Date();
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        // Garder les valeurs par défaut en cas d'erreur
      } finally {
        this.isLoading = false;
      }
    },

    // Réinitialiser aux valeurs par défaut
    resetToDefaults() {
      this.isDarkMode = true;
      this.currency = 'EUR';
      this.dateFormat = 'fr-FR';
      this.notifications = true;
      this.autoBackup = true;
      this.language = 'fr';
      this.saveSettings();
    }
  }
});