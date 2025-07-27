import { ref, computed } from 'vue';
import { type ZodSchema, type ZodError } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

export interface UseValidatedFormOptions<T> {
  schema: ZodSchema<T>;
  initialValues?: Partial<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  validateOnChange?: boolean;
}

export function useValidatedForm<T extends Record<string, any>>(
  options: UseValidatedFormOptions<T>
) {
  const { schema, initialValues = {}, onSubmit, validateOnChange = true } = options;

  // État du formulaire
  const formData = ref({ ...initialValues } as T);
  const errors = ref<ValidationError[]>([]);
  const isSubmitting = ref(false);
  const isDirty = ref(false);
  const touchedFields = ref(new Set<string>());

  // Validation complète
  const validate = (): boolean => {
    try {
      schema.parse(formData.value);
      errors.value = [];
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        errors.value = error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }));
      } else {
        errors.value = [{ field: 'root', message: 'Erreur de validation' }];
      }
      return false;
    }
  };

  // Validation d'un champ spécifique
  const validateField = (fieldName: string): boolean => {
    try {
      const fieldSchema = schema.shape?.[fieldName];
      if (!fieldSchema) return true;

      fieldSchema.parse(formData.value[fieldName]);
      
      // Supprimer les erreurs de ce champ
      errors.value = errors.value.filter(e => e.field !== fieldName);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        // Remplacer ou ajouter l'erreur pour ce champ
        errors.value = errors.value.filter(e => e.field !== fieldName);
        errors.value.push({
          field: fieldName,
          message: error.errors[0]?.message || 'Erreur de validation'
        });
      }
      return false;
    }
  };

  // Getters pour les erreurs
  const getFieldError = (fieldName: string) => {
    return errors.value.find(e => e.field === fieldName)?.message;
  };

  const hasFieldError = (fieldName: string) => {
    return !!getFieldError(fieldName);
  };

  const hasErrors = computed(() => errors.value.length > 0);

  // Gestion des champs touchés
  const markFieldTouched = (fieldName: string) => {
    touchedFields.value.add(fieldName);
  };

  const isFieldTouched = (fieldName: string) => {
    return touchedFields.value.has(fieldName);
  };

  // Mettre à jour un champ
  const setFieldValue = <K extends keyof T>(fieldName: K, value: T[K]) => {
    formData.value[fieldName] = value;
    isDirty.value = true;
    markFieldTouched(fieldName as string);

    if (validateOnChange && isFieldTouched(fieldName as string)) {
      validateField(fieldName as string);
    }
  };

  // Gestionnaire d'événement pour les inputs
  const createFieldHandler = <K extends keyof T>(fieldName: K) => {
    return (event: Event | any) => {
      const target = event.target || event;
      let value: T[K];

      if (target && 'value' in target) {
        value = target.value;
      } else {
        value = event;
      }

      setFieldValue(fieldName, value);
    };
  };

  // Gestionnaire de soumission
  const handleSubmit = async (event?: Event) => {
    if (event) {
      event.preventDefault();
    }

    // Marquer tous les champs comme touchés
    Object.keys(formData.value).forEach(field => {
      markFieldTouched(field);
    });

    const isValid = validate();
    if (!isValid || !onSubmit) return false;

    try {
      isSubmitting.value = true;
      await onSubmit(formData.value);
      return true;
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      errors.value.push({
        field: 'root',
        message: error instanceof Error ? error.message : 'Erreur de soumission'
      });
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  // Réinitialiser le formulaire
  const reset = (newValues?: Partial<T>) => {
    formData.value = { ...initialValues, ...newValues } as T;
    errors.value = [];
    isDirty.value = false;
    touchedFields.value.clear();
  };

  // État calculé
  const isValid = computed(() => !hasErrors.value);
  const canSubmit = computed(() => 
    isValid.value && !isSubmitting.value && isDirty.value
  );

  return {
    // État
    formData: readonly(formData),
    errors: readonly(errors),
    isSubmitting: readonly(isSubmitting),
    isDirty: readonly(isDirty),
    isValid,
    hasErrors,
    canSubmit,

    // Méthodes de validation
    validate,
    validateField,
    getFieldError,
    hasFieldError,
    isFieldTouched,

    // Méthodes de manipulation
    setFieldValue,
    createFieldHandler,
    handleSubmit,
    reset,

    // Utilitaires
    markFieldTouched
  };
}