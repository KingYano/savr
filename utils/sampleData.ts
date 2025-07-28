import { MovementsService } from './database';
import type { Movement } from '~/types/finance';

export async function addSampleData(): Promise<void> {
('🎯 [SampleData] - Creating sample movements...');
  
  // D'abord, vider la base de données existante
  await MovementsService.saveMovements([]);
('🎯 [SampleData] - Cleared existing data');
  
  // Utiliser le mois actuel pour les dates de test
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based
  
  // Créer quelques mouvements de test avec des dates du mois actuel
  const sampleMovements: Movement[] = [
    {
      id: 1,
      name: "Salaire",
      amount: 3000,
      date: new Date(currentYear, currentMonth, 15),
      type: "income",
      isRecurrent: true,
      description: "Salaire mensuel"
    },
    {
      id: 2,
      name: "Loyer",
      amount: 800,
      date: new Date(currentYear, currentMonth, 1),
      type: "expense",
      isRecurrent: true,
      description: "Loyer mensuel"
    },
    {
      id: 3,
      name: "Courses",
      amount: 120,
      date: new Date(currentYear, currentMonth, 5),
      type: "expense",
      isRecurrent: false,
      description: "Courses alimentaires"
    },
    {
      id: 4,
      name: "Restaurant",
      amount: 45,
      date: new Date(currentYear, currentMonth, 10),
      type: "expense",
      isRecurrent: false,
      description: "Déjeuner restaurant"
    },
    {
      id: 5,
      name: "Freelance",
      amount: 500,
      date: new Date(currentYear, currentMonth, 20),
      type: "income",
      isRecurrent: false,
      description: "Mission freelance"
    }
  ];

('🎯 [SampleData] - Sample movements created:', sampleMovements);
  
  // Sauvegarder dans la base de données
  await MovementsService.saveMovements(sampleMovements);
('🎯 [SampleData] - Sample data saved successfully to database');
}