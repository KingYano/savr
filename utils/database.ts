import Dexie, { type EntityTable } from 'dexie';
import type { Movement } from '~/types/finance';
import type { Category, Tag } from '~/types/categories';

export interface StoredMovement extends Omit<Movement, 'date'> {
  date: string; // Stocké comme string pour IndexedDB
}

export type SettingValue = string | number | boolean | object | null;

export interface AppSettings {
  id?: number;
  key: string;
  value: SettingValue;
  updatedAt: Date;
}

export interface StoredCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  isDefault: boolean;
  parentId?: string;
  order: number;
  createdAt: string;
}

export interface StoredTag {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

// Base de données IndexedDB avec Dexie
export class SavrDatabase extends Dexie {
  movements!: EntityTable<StoredMovement, 'id'>;
  settings!: EntityTable<AppSettings, 'id'>;
  categories!: EntityTable<StoredCategory, 'id'>;
  tags!: EntityTable<StoredTag, 'id'>;

  constructor() {
    super('SavrDB');
    
    this.version(1).stores({
      movements: 'id, name, amount, date, type, isRecurrent, imageUrl',
      settings: '++id, key, value, updatedAt'
    });

    this.version(2).stores({
      movements: 'id, name, amount, date, type, isRecurrent, imageUrl, isGeneratedRecurrence',
      settings: '++id, key, value, updatedAt'
    }).upgrade(tx => {
      // Migration pour ajouter isGeneratedRecurrence
      return tx.table('movements').toCollection().modify(movement => {
        movement.isGeneratedRecurrence = false;
      });
    });

    this.version(3).stores({
      movements: 'id, name, amount, date, type, isRecurrent, imageUrl, isGeneratedRecurrence, categoryId',
      settings: '++id, key, value, updatedAt',
      categories: 'id, name, order, isDefault',
      tags: 'id, name'
    }).upgrade(tx => {
      // Migration pour ajouter categoryId et tags aux mouvements
      return tx.table('movements').toCollection().modify(movement => {
        movement.categoryId = null;
        movement.tags = [];
        movement.description = null;
      });
    });
  }
}

// Instance unique de la base de données
export const db = new SavrDatabase();

// Service de gestion des mouvements
export class MovementsService {
  // Sauvegarder tous les mouvements
  static async saveMovements(movements: Movement[]): Promise<void> {
    try {
      const storedMovements: StoredMovement[] = movements.map(m => {
        // S'assurer que date est un objet Date
        const date = m.date instanceof Date ? m.date : new Date(m.date);
        
        return {
          ...m,
          date: date.toISOString()
        };
      });

      await db.transaction('rw', db.movements, async () => {
        await db.movements.clear();
        await db.movements.bulkAdd(storedMovements);
      });
    } catch (error) {
      console.error('Erreur sauvegarde mouvements:', error);
      throw new Error('Impossible de sauvegarder les mouvements');
    }
  }

  // Charger tous les mouvements
  static async loadMovements(): Promise<Movement[]> {
    try {
      const storedMovements = await db.movements.toArray();
      
      return storedMovements.map(m => ({
        ...m,
        date: new Date(m.date)
      }));
    } catch (error) {
      console.error('Erreur chargement mouvements:', error);
      throw new Error('Impossible de charger les mouvements');
    }
  }

  // Ajouter un mouvement
  static async addMovement(movement: Movement): Promise<void> {
    try {
      const date = movement.date instanceof Date ? movement.date : new Date(movement.date);
      
      const storedMovement: StoredMovement = {
        ...movement,
        date: date.toISOString()
      };

      await db.movements.add(storedMovement);
    } catch (error) {
      console.error('Erreur ajout mouvement:', error);
      throw new Error('Impossible d\'ajouter le mouvement');
    }
  }

  // Mettre à jour un mouvement
  static async updateMovement(movement: Movement): Promise<void> {
    try {
      const date = movement.date instanceof Date ? movement.date : new Date(movement.date);
      
      const storedMovement: StoredMovement = {
        ...movement,
        date: date.toISOString()
      };

      await db.movements.update(movement.id, storedMovement);
    } catch (error) {
      console.error('Erreur mise à jour mouvement:', error);
      throw new Error('Impossible de mettre à jour le mouvement');
    }
  }

  // Supprimer un mouvement
  static async deleteMovement(id: number): Promise<void> {
    try {
      await db.movements.delete(id);
    } catch (error) {
      console.error('Erreur suppression mouvement:', error);
      throw new Error('Impossible de supprimer le mouvement');
    }
  }

  // Vider tous les mouvements
  static async clearAllMovements(): Promise<void> {
    try {
      await db.movements.clear();
    } catch (error) {
      console.error('Erreur vidage mouvements:', error);
      throw new Error('Impossible de vider les mouvements');
    }
  }
}

// Service de gestion des paramètres
export class SettingsService {
  // Sauvegarder un paramètre
  static async saveSetting(key: string, value: SettingValue): Promise<void> {
    try {
      const existing = await db.settings.where('key').equals(key).first();
      
      const setting: AppSettings = {
        key,
        value,
        updatedAt: new Date()
      };

      if (existing) {
        await db.settings.update(existing.id!, setting);
      } else {
        await db.settings.add(setting);
      }
    } catch (error) {
      console.error('Erreur sauvegarde paramètre:', error);
      throw new Error(`Impossible de sauvegarder le paramètre ${key}`);
    }
  }

  // Charger un paramètre
  static async loadSetting<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const setting = await db.settings.where('key').equals(key).first();
      return setting ? setting.value : defaultValue;
    } catch (error) {
      console.error('Erreur chargement paramètre:', error);
      return defaultValue;
    }
  }

  // Charger tous les paramètres
  static async loadAllSettings(): Promise<Record<string, any>> {
    try {
      const settings = await db.settings.toArray();
      return settings.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>);
    } catch (error) {
      console.error('Erreur chargement paramètres:', error);
      return {};
    }
  }

  // Supprimer un paramètre
  static async deleteSetting(key: string): Promise<void> {
    try {
      await db.settings.where('key').equals(key).delete();
    } catch (error) {
      console.error('Erreur suppression paramètre:', error);
      throw new Error(`Impossible de supprimer le paramètre ${key}`);
    }
  }
}

// Service de migration depuis localStorage
export class MigrationService {
  // Migrer les données depuis localStorage
  static async migrateFromLocalStorage(): Promise<{
    movements: number;
    settings: number;
  }> {
    if (!process.client) {
      return { movements: 0, settings: 0 };
    }

    let migratedMovements = 0;
    let migratedSettings = 0;

    try {
      // Migration des mouvements
      const storedMovements = localStorage.getItem('financeMovements');
      if (storedMovements) {
        const movements: Movement[] = JSON.parse(storedMovements);
        await MovementsService.saveMovements(movements);
        migratedMovements = movements.length;
        localStorage.removeItem('financeMovements');
      }

      // Migration des paramètres utilisateur
      const storedSettings = localStorage.getItem('userSettings');
      if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        for (const [key, value] of Object.entries(settings)) {
          await SettingsService.saveSetting(key, value);
          migratedSettings++;
        }
        localStorage.removeItem('userSettings');
      }

(`Migration terminée: ${migratedMovements} mouvements, ${migratedSettings} paramètres`);
      
      return { movements: migratedMovements, settings: migratedSettings };
    } catch (error) {
      console.error('Erreur lors de la migration:', error);
      throw new Error('Échec de la migration des données');
    }
  }

  // Vérifier si une migration est nécessaire
  static needsMigration(): boolean {
    if (!process.client) return false;
    
    return !!(
      localStorage.getItem('financeMovements') ||
      localStorage.getItem('userSettings')
    );
  }

  // Exporter toutes les données pour sauvegarde
  static async exportData(): Promise<{
    movements: Movement[];
    settings: Record<string, any>;
    exportDate: string;
    version: string;
  }> {
    try {
      const movements = await MovementsService.loadMovements();
      const settings = await SettingsService.loadAllSettings();

      return {
        movements,
        settings,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
    } catch (error) {
      console.error('Erreur export données:', error);
      throw new Error('Impossible d\'exporter les données');
    }
  }

  // Importer des données depuis une sauvegarde
  static async importData(data: {
    movements: Movement[];
    settings: Record<string, any>;
  }): Promise<void> {
    try {
      await db.transaction('rw', [db.movements, db.settings], async () => {
        // Sauvegarder les mouvements
        if (data.movements?.length) {
          await MovementsService.saveMovements(data.movements);
        }

        // Sauvegarder les paramètres
        if (data.settings) {
          for (const [key, value] of Object.entries(data.settings)) {
            await SettingsService.saveSetting(key, value);
          }
        }
      });
    } catch (error) {
      console.error('Erreur import données:', error);
      throw new Error('Impossible d\'importer les données');
    }
  }
}

// Service de gestion des catégories
export class CategoriesService {
  // Sauvegarder toutes les catégories
  static async saveCategories(categories: Category[]): Promise<void> {
    try {
      const storedCategories: StoredCategory[] = categories.map(cat => ({
        ...cat,
        createdAt: cat.createdAt.toISOString()
      }));

      await db.transaction('rw', db.categories, async () => {
        await db.categories.clear();
        await db.categories.bulkAdd(storedCategories);
      });
    } catch (error) {
      console.error('Erreur sauvegarde catégories:', error);
      throw new Error('Impossible de sauvegarder les catégories');
    }
  }

  // Charger toutes les catégories
  static async loadCategories(): Promise<Category[]> {
    try {
      const storedCategories = await db.categories.toArray();
      
      return storedCategories.map(cat => ({
        ...cat,
        createdAt: new Date(cat.createdAt)
      }));
    } catch (error) {
      console.error('Erreur chargement catégories:', error);
      return [];
    }
  }

  // Sauvegarder tous les tags
  static async saveTags(tags: Tag[]): Promise<void> {
    try {
      const storedTags: StoredTag[] = tags.map(tag => ({
        ...tag,
        createdAt: tag.createdAt.toISOString()
      }));

      await db.transaction('rw', db.tags, async () => {
        await db.tags.clear();
        await db.tags.bulkAdd(storedTags);
      });
    } catch (error) {
      console.error('Erreur sauvegarde tags:', error);
      throw new Error('Impossible de sauvegarder les tags');
    }
  }

  // Charger tous les tags
  static async loadTags(): Promise<Tag[]> {
    try {
      const storedTags = await db.tags.toArray();
      
      return storedTags.map(tag => ({
        ...tag,
        createdAt: new Date(tag.createdAt)
      }));
    } catch (error) {
      console.error('Erreur chargement tags:', error);
      return [];
    }
  }
}