import { ref, computed, readonly } from 'vue';
import { type ZodSchema, ZodError } from 'zod';

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

export function useValidatedForm<T extends Record<string, unknown>>(
  options: UseValidatedFormOptions<T>
) {
  const { schema, initialValues = {}, onSubmit, validateOnChange = true } = options;

  const formData = ref({ ...initialValues } as T);
  const errors = ref<ValidationError[]>([]);
  const isSubmitting = ref(false);
  const isDirty = ref(false);
  const touchedFields = ref(new Set<string>());

  const validate = (): boolean => {
    try {
      schema.parse(formData.value);
      errors.value = [];
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        errors.value = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message
        }));
      } else {
        errors.value = [{ field: 'root', message: 'Erreur de validation' }];
      }
      return false;
    }
  };

  const hasShape = (schema: ZodSchema<T>): schema is ZodSchema<T> & { shape: Record<string, ZodSchema<unknown>> } => {
    return 'shape' in schema && typeof (schema as { shape?: unknown }).shape === 'object';
  };

  const validateField = (fieldName: string): boolean => {
    try {
      if (!hasShape(schema)) return true;
      
      const fieldSchema = schema.shape[fieldName];
      if (!fieldSchema) return true;

      fieldSchema.parse(formData.value[fieldName]);
      errors.value = errors.value.filter(e => e.field !== fieldName);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        errors.value = errors.value.filter(e => e.field !== fieldName);
        errors.value.push({
          field: fieldName,
          message: error.issues[0]?.message || 'Erreur de validation'
        });
      }
      return false;
    }
  };

  const getFieldError = (fieldName: string) => {
    return errors.value.find(e => e.field === fieldName)?.message;
  };

  const hasFieldError = (fieldName: string) => {
    return !!getFieldError(fieldName);
  };

  const hasErrors = computed(() => errors.value.length > 0);

  const markFieldTouched = (fieldName: string) => {
    touchedFields.value.add(fieldName);
  };

  const isFieldTouched = (fieldName: string) => {
    return touchedFields.value.has(fieldName);
  };

  const setFieldValue = <K extends keyof T>(fieldName: K, value: T[K]) => {
    formData.value[fieldName] = value;
    isDirty.value = true;
    markFieldTouched(fieldName as string);

    if (validateOnChange && isFieldTouched(fieldName as string)) {
      validateField(fieldName as string);
    }
  };

  const createFieldHandler = <K extends keyof T>(fieldName: K) => {
    return (event: Event | T[K]) => {
      const target = event as Event & { target?: { value?: T[K] } };
      let value: T[K];

      if (target.target && 'value' in target.target) {
        value = target.target.value as T[K];
      } else {
        value = event as T[K];
      }

      setFieldValue(fieldName, value);
    };
  };

  const handleSubmit = async (event?: Event) => {
    if (event) {
      event.preventDefault();
    }

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
      errors.value.push({
        field: 'root',
        message: error instanceof Error ? error.message : 'Erreur de soumission'
      });
      return false;
    } finally {
      isSubmitting.value = false;
    }
  };

  const reset = (newValues?: Partial<T>) => {
    formData.value = { ...initialValues, ...newValues } as T;
    errors.value = [];
    isDirty.value = false;
    touchedFields.value.clear();
  };

  const isValid = computed(() => !hasErrors.value);
  const canSubmit = computed(() => 
    isValid.value && !isSubmitting.value && isDirty.value
  );

  return {
    formData: readonly(formData),
    errors: readonly(errors),
    isSubmitting: readonly(isSubmitting),
    isDirty: readonly(isDirty),
    isValid,
    hasErrors,
    canSubmit,
    validate,
    validateField,
    getFieldError,
    hasFieldError,
    isFieldTouched,
    setFieldValue,
    createFieldHandler,
    handleSubmit,
    reset,
    markFieldTouched
  };
}