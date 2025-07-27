export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
  file?: File;
}

export interface ImageValidationOptions {
  maxSizeBytes: number;
  allowedTypes: string[];
  maxWidth?: number;
  maxHeight?: number;
}

export const DEFAULT_IMAGE_OPTIONS: ImageValidationOptions = {
  maxSizeBytes: 2 * 1024 * 1024, // 2MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxWidth: 1920,
  maxHeight: 1080
};

export async function validateImageFile(
  file: File, 
  options: Partial<ImageValidationOptions> = {}
): Promise<ImageValidationResult> {
  const opts = { ...DEFAULT_IMAGE_OPTIONS, ...options };

  // Vérification de la taille
  if (file.size > opts.maxSizeBytes) {
    return {
      isValid: false,
      error: `Fichier trop volumineux. Maximum ${Math.round(opts.maxSizeBytes / 1024 / 1024)}MB autorisé.`
    };
  }

  // Vérification du type MIME réel
  const actualMimeType = await getActualMimeType(file);
  if (!opts.allowedTypes.includes(actualMimeType)) {
    return {
      isValid: false,
      error: `Type de fichier non autorisé. Types acceptés: ${opts.allowedTypes.join(', ')}`
    };
  }

  // Vérification des dimensions si spécifiées
  if (opts.maxWidth || opts.maxHeight) {
    try {
      const dimensions = await getImageDimensions(file);
      if (opts.maxWidth && dimensions.width > opts.maxWidth) {
        return {
          isValid: false,
          error: `Largeur trop importante. Maximum ${opts.maxWidth}px autorisé.`
        };
      }
      if (opts.maxHeight && dimensions.height > opts.maxHeight) {
        return {
          isValid: false,
          error: `Hauteur trop importante. Maximum ${opts.maxHeight}px autorisé.`
        };
      }
    } catch (error) {
      return {
        isValid: false,
        error: 'Impossible de lire les dimensions de l\'image.'
      };
    }
  }

  return {
    isValid: true,
    file
  };
}

async function getActualMimeType(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arr = new Uint8Array(reader.result as ArrayBuffer);
      
      // Signatures de fichiers (magic numbers)
      const signatures = {
        'image/jpeg': [0xFF, 0xD8, 0xFF],
        'image/png': [0x89, 0x50, 0x4E, 0x47],
        'image/webp': [0x52, 0x49, 0x46, 0x46]
      };

      for (const [mimeType, signature] of Object.entries(signatures)) {
        if (signature.every((byte, index) => arr[index] === byte)) {
          resolve(mimeType);
          return;
        }
      }

      // Si aucune signature reconnue, fallback sur le type déclaré
      resolve(file.type);
    };
    reader.onerror = () => reject(new Error('Erreur lecture fichier'));
    reader.readAsArrayBuffer(file.slice(0, 12)); // Lire seulement les premiers bytes
  });
}

async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => reject(new Error('Impossible de charger l\'image'));
    img.src = URL.createObjectURL(file);
  });
}