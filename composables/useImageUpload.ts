import { ref, readonly, onUnmounted } from 'vue';
import { validateImageFile, type ImageValidationResult } from '~/utils/imageValidator';
import { compressImage, type CompressionResult, formatFileSize } from '~/utils/imageCompressor';

export interface UseImageUploadOptions {
  maxSizeBytes?: number;
  allowedTypes?: string[];
  maxWidth?: number;
  maxHeight?: number;
  compressionEnabled?: boolean;
}

export interface ImageUploadState {
  file: File | null;
  previewUrl: string;
  fileName: string;
  isUploading: boolean;
  error: string;
  compressionInfo: string;
}

export function useImageUpload(options: UseImageUploadOptions = {}) {
  const state = ref<ImageUploadState>({
    file: null,
    previewUrl: '',
    fileName: '',
    isUploading: false,
    error: '',
    compressionInfo: ''
  });

  const resetState = () => {
    if (state.value.previewUrl && state.value.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(state.value.previewUrl);
    }
    
    state.value = {
      file: null,
      previewUrl: '',
      fileName: '',
      isUploading: false,
      error: '',
      compressionInfo: ''
    };
  };

  const handleFileUpload = async (file: File): Promise<boolean> => {
    state.value.isUploading = true;
    state.value.error = '';
    state.value.compressionInfo = '';

    try {
      // Validation du fichier
      const validationResult: ImageValidationResult = await validateImageFile(file, {
        maxSizeBytes: options.maxSizeBytes,
        allowedTypes: options.allowedTypes,
        maxWidth: options.maxWidth,
        maxHeight: options.maxHeight
      });

      if (!validationResult.isValid) {
        state.value.error = validationResult.error || 'Fichier invalide';
        state.value.isUploading = false;
        return false;
      }

      let finalFile = file;
      let previewUrl = '';

      // Compression si activée
      if (options.compressionEnabled !== false) {
        try {
          const compressionResult: CompressionResult = await compressImage(file, {
            maxWidth: 800,
            maxHeight: 600,
            quality: 0.8
          });

          finalFile = new File([compressionResult.compressedFile], file.name, {
            type: compressionResult.compressedFile.type,
            lastModified: Date.now()
          });

          previewUrl = compressionResult.dataUrl;

          if (compressionResult.compressionRatio > 0) {
            state.value.compressionInfo = `Compression: ${formatFileSize(compressionResult.originalSize)} → ${formatFileSize(compressionResult.compressedSize)} (-${compressionResult.compressionRatio}%)`;
          }
        } catch (compressionError) {
          console.warn('Compression échouée, utilisation du fichier original:', compressionError);
          previewUrl = URL.createObjectURL(file);
        }
      } else {
        previewUrl = URL.createObjectURL(file);
      }

      // Mettre à jour l'état
      state.value.file = finalFile;
      state.value.previewUrl = previewUrl;
      state.value.fileName = file.name;
      state.value.isUploading = false;

      return true;
    } catch (error) {
      state.value.error = error instanceof Error ? error.message : 'Erreur lors du traitement du fichier';
      state.value.isUploading = false;
      return false;
    }
  };

  const getDataUrl = async (): Promise<string> => {
    if (!state.value.file) {
      throw new Error('Aucun fichier sélectionné');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Erreur lecture fichier'));
      reader.readAsDataURL(state.value.file!);
    });
  };

  // Cleanup automatique
  onUnmounted(() => {
    resetState();
  });

  return {
    state: readonly(state),
    handleFileUpload,
    resetState,
    getDataUrl
  };
}