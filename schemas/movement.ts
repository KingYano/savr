import { z } from 'zod';

// Schéma pour un nouveau mouvement
export const newMovementSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .trim(),
  
  amount: z
    .number({ invalid_type_error: 'Le montant doit être un nombre' })
    .positive('Le montant doit être positif')
    .max(1000000, 'Le montant ne peut pas dépasser 1 000 000€')
    .transform(val => Math.round(val * 100) / 100), // Arrondir à 2 décimales
  
  date: z
    .union([z.string(), z.date()])
    .refine((val) => {
      const date = typeof val === 'string' ? new Date(val) : val;
      return !isNaN(date.getTime());
    }, 'Date invalide')
    .transform((val) => typeof val === 'string' ? new Date(val) : val),
  
  type: z
    .enum(['income', 'expense'], {
      required_error: 'Le type est requis',
      invalid_type_error: 'Type invalide (income ou expense attendu)'
    }),
  
  isRecurrent: z
    .boolean()
    .default(false),
  
  imageUrl: z
    .string()
    .url('URL d\'image invalide')
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val)
});

// Schéma pour un mouvement existant (avec ID)
export const movementSchema = newMovementSchema.extend({
  id: z
    .number()
    .positive('ID invalide'),
  
  isGeneratedRecurrence: z
    .boolean()
    .optional()
    .default(false)
});

// Schéma pour les données de formulaire (avant transformation)
export const movementFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  
  amount: z
    .union([z.string(), z.number()])
    .refine((val) => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      return !isNaN(num) && num > 0;
    }, 'Montant invalide')
    .transform((val) => typeof val === 'string' ? parseFloat(val) : val),
  
  date: z
    .string()
    .min(1, 'La date est requise')
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, 'Format de date invalide'),
  
  type: z
    .enum(['income', 'expense'], {
      required_error: 'Veuillez sélectionner un type',
      invalid_type_error: 'Type invalide'
    }),
  
  isRecurrent: z
    .boolean()
    .default(false),
  
  imageUrl: z
    .string()
    .optional()
});

// Validation personnalisées
export const customValidations = {
  // Vérifier que la date n'est pas trop dans le futur
  dateNotTooFuture: (date: Date) => {
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    return date <= oneYearFromNow;
  },
  
  // Vérifier que la date n'est pas trop dans le passé
  dateNotTooOld: (date: Date) => {
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    return date >= tenYearsAgo;
  },
  
  // Validation métier pour le nom
  validMovementName: (name: string) => {
    // Pas de caractères spéciaux dangereux
    const dangerousChars = /[<>\"'&]/;
    return !dangerousChars.test(name);
  },
  
  // Montant raisonnable selon le type
  reasonableAmount: (amount: number, type: 'income' | 'expense') => {
    // Revenus: max 50k€ par mois
    if (type === 'income' && amount > 50000) return false;
    // Dépenses: max 20k€ par transaction
    if (type === 'expense' && amount > 20000) return false;
    return true;
  }
};

// Types inférés des schémas
export type NewMovementForm = z.infer<typeof movementFormSchema>;
export type NewMovement = z.infer<typeof newMovementSchema>;
export type Movement = z.infer<typeof movementSchema>;

// Fonction de validation complète avec métier
export function validateMovementWithBusiness(data: any): {
  success: boolean;
  data?: NewMovement;
  errors?: string[];
} {
  try {
    // Validation du schéma de base
    const parsed = newMovementSchema.parse(data);
    
    const errors: string[] = [];
    
    // Validations métier
    if (!customValidations.dateNotTooFuture(parsed.date)) {
      errors.push('La date ne peut pas être dans plus d\'un an');
    }
    
    if (!customValidations.dateNotTooOld(parsed.date)) {
      errors.push('La date ne peut pas être antérieure à 10 ans');
    }
    
    if (!customValidations.validMovementName(parsed.name)) {
      errors.push('Le nom contient des caractères non autorisés');
    }
    
    if (!customValidations.reasonableAmount(parsed.amount, parsed.type)) {
      const maxAmount = parsed.type === 'income' ? '50 000€' : '20 000€';
      errors.push(`Le montant semble trop élevé (max ${maxAmount})`);
    }
    
    if (errors.length > 0) {
      return { success: false, errors };
    }
    
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(e => e.message);
      return { success: false, errors };
    }
    
    return { success: false, errors: ['Erreur de validation inconnue'] };
  }
}