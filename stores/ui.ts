import { defineStore } from 'pinia';
import type { Movement } from '~/types/finance';

export interface NotificationOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

export interface UINotification extends NotificationOptions {
  id: string;
  timestamp: Date;
}

export interface UIState {
  notifications: UINotification[];
  isLoading: boolean;
  loadingMessage: string;
  selectedDate: Date;
  currentMonth: Date;
  showAddDialog: boolean;
  showEditDialog: boolean;
  editingMovement: Movement | null;
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    notifications: [],
    isLoading: false,
    loadingMessage: '',
    selectedDate: new Date(),
    currentMonth: new Date(),
    showAddDialog: false,
    showEditDialog: false,
    editingMovement: null
  }),

  getters: {
    // Notifications actives (non expirées)
    activeNotifications: (state) => {
      return state.notifications.filter(notification => {
        if (notification.persistent) return true;
        const now = Date.now();
        const notificationTime = notification.timestamp.getTime();
        const duration = notification.duration || 5000; // 5s par défaut
        return (now - notificationTime) < duration;
      });
    },

    // Y a-t-il des notifications d'erreur ?
    hasErrors: (state) => state.notifications.some(n => n.type === 'error'),

    // État des dialogs
    hasOpenDialog: (state) => state.showAddDialog || state.showEditDialog
  },

  actions: {
    // Ajouter une notification
    addNotification(options: NotificationOptions): string {
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      const notification: UINotification = {
        ...options,
        id,
        timestamp: new Date()
      };

      this.notifications.push(notification);

      // Auto-suppression pour les notifications non persistantes
      if (!options.persistent) {
        const duration = options.duration || 5000;
        setTimeout(() => {
          this.removeNotification(id);
        }, duration);
      }

      return id;
    },

    // Supprimer une notification
    removeNotification(id: string) {
      const index = this.notifications.findIndex(n => n.id === id);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    },

    // Supprimer toutes les notifications
    clearNotifications() {
      this.notifications = [];
    },

    // Notifications de succès
    showSuccess(title: string, message?: string, duration?: number) {
      return this.addNotification({
        type: 'success',
        title,
        message,
        duration
      });
    },

    // Notifications d'erreur
    showError(title: string, message?: string, persistent = false) {
      return this.addNotification({
        type: 'error',
        title,
        message,
        persistent
      });
    },

    // Notifications d'avertissement
    showWarning(title: string, message?: string, duration?: number) {
      return this.addNotification({
        type: 'warning',
        title,
        message,
        duration
      });
    },

    // Notifications d'information
    showInfo(title: string, message?: string, duration?: number) {
      return this.addNotification({
        type: 'info',
        title,
        message,
        duration
      });
    },

    // Gestion du loading global
    setLoading(isLoading: boolean, message = '') {
      this.isLoading = isLoading;
      this.loadingMessage = message;
    },

    // Gestion de la date sélectionnée
    setSelectedDate(date: Date) {
      if (date && !isNaN(date.getTime())) {
        this.selectedDate = date;
      }
    },

    // Gestion du mois courant
    setCurrentMonth(date: Date) {
      if (date && !isNaN(date.getTime())) {
        this.currentMonth = date;
      }
    },

    // Gestion des dialogs
    openAddDialog() {
      this.showAddDialog = true;
      this.showEditDialog = false;
      this.editingMovement = null;
    },

    closeAddDialog() {
      this.showAddDialog = false;
    },

    openEditDialog(movement: Movement) {
      this.showEditDialog = true;
      this.showAddDialog = false;
      this.editingMovement = movement;
    },

    closeEditDialog() {
      this.showEditDialog = false;
      this.editingMovement = null;
    },

    closeAllDialogs() {
      this.showAddDialog = false;
      this.showEditDialog = false;
      this.editingMovement = null;
    }
  }
});