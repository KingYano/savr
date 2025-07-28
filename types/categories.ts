export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  isDefault: boolean;
  parentId?: string; // Pour les sous-catégories
  order: number;
  createdAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

// Catégories prédéfinies
export const DEFAULT_CATEGORIES: Omit<Category, 'id' | 'createdAt'>[] = [
  // Dépenses
  {
    name: 'Alimentation',
    icon: '🍽️',
    color: '#10B981',
    description: 'Courses, restaurants, livraison',
    isDefault: true,
    order: 1
  },
  {
    name: 'Transport',
    icon: '🚗',
    color: '#3B82F6',
    description: 'Essence, transport public, parking',
    isDefault: true,
    order: 2
  },
  {
    name: 'Logement',
    icon: '🏠',
    color: '#8B5CF6',
    description: 'Loyer, charges, entretien',
    isDefault: true,
    order: 3
  },
  {
    name: 'Santé',
    icon: '⚕️',
    color: '#EF4444',
    description: 'Médecin, pharmacie, assurance',
    isDefault: true,
    order: 4
  },
  {
    name: 'Loisirs',
    icon: '🎮',
    color: '#F59E0B',
    description: 'Divertissement, hobbies, sorties',
    isDefault: true,
    order: 5
  },
  {
    name: 'Shopping',
    icon: '🛍️',
    color: '#EC4899',
    description: 'Vêtements, équipement, cadeaux',
    isDefault: true,
    order: 6
  },
  {
    name: 'Éducation',
    icon: '📚',
    color: '#06B6D4',
    description: 'Formation, livres, cours',
    isDefault: true,
    order: 7
  },
  
  // Revenus
  {
    name: 'Salaire',
    icon: '💼',
    color: '#059669',
    description: 'Salaire principal, primes',
    isDefault: true,
    order: 10
  },
  {
    name: 'Freelance',
    icon: '💻',
    color: '#7C3AED',
    description: 'Missions, consulting',
    isDefault: true,
    order: 11
  },
  {
    name: 'Investissements',
    icon: '📈',
    color: '#DC2626',
    description: 'Dividendes, plus-values',
    isDefault: true,
    order: 12
  },
  {
    name: 'Remboursements',
    icon: '💰',
    color: '#16A34A',
    description: 'Remboursements, remises',
    isDefault: true,
    order: 13
  },
  
  // Général
  {
    name: 'Autres',
    icon: '📦',
    color: '#6B7280',
    description: 'Divers, non classé',
    isDefault: true,
    order: 99
  }
];

// Types pour les filtres par catégorie
export interface CategoryFilter {
  categoryIds: string[];
  includeSubcategories: boolean;
  includeUncategorized: boolean;
}

// Statistiques par catégorie
export interface CategoryStats {
  categoryId: string;
  category: Category;
  totalAmount: number;
  percentage: number;
  movementCount: number;
  avgAmount: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
}

// Types pour l'interface
export interface CategorySelectOption {
  value: string;
  label: string;
  icon: string;
  color: string;
  description?: string;
}

export interface TagSelectOption {
  value: string;
  label: string;
  color: string;
}