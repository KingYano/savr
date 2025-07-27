export interface CompressionOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
  maintainAspectRatio: boolean;
}

export const DEFAULT_COMPRESSION_OPTIONS: CompressionOptions = {
  maxWidth: 800,
  maxHeight: 600,
  quality: 0.8,
  format: 'webp',
  maintainAspectRatio: true
};

export interface CompressionResult {
  compressedFile: Blob;
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

export async function compressImage(
  file: File,
  options: Partial<CompressionOptions> = {}
): Promise<CompressionResult> {
  const opts = { ...DEFAULT_COMPRESSION_OPTIONS, ...options };
  
  // Vérifier le support WebP
  if (opts.format === 'webp' && !await supportsWebP()) {
    opts.format = 'jpeg';
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Impossible de créer le contexte canvas'));
          return;
        }

        // Calculer les nouvelles dimensions
        const { width, height } = calculateDimensions(
          img.naturalWidth,
          img.naturalHeight,
          opts.maxWidth,
          opts.maxHeight,
          opts.maintainAspectRatio
        );

        canvas.width = width;
        canvas.height = height;

        // Améliorer la qualité de redimensionnement
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir en blob avec compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Erreur lors de la compression'));
              return;
            }

            // Générer l'URL de données
            const reader = new FileReader();
            reader.onload = () => {
              const dataUrl = reader.result as string;
              const compressionRatio = ((file.size - blob.size) / file.size) * 100;

              resolve({
                compressedFile: blob,
                dataUrl,
                originalSize: file.size,
                compressedSize: blob.size,
                compressionRatio: Math.round(compressionRatio)
              });
            };
            reader.onerror = () => reject(new Error('Erreur génération dataURL'));
            reader.readAsDataURL(blob);
          },
          `image/${opts.format}`,
          opts.quality
        );

        // Nettoyer
        URL.revokeObjectURL(img.src);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Impossible de charger l\'image'));
    img.src = URL.createObjectURL(file);
  });
}

function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
  maintainAspectRatio: boolean
): { width: number; height: number } {
  if (!maintainAspectRatio) {
    return { width: maxWidth, height: maxHeight };
  }

  const aspectRatio = originalWidth / originalHeight;

  let width = originalWidth;
  let height = originalHeight;

  // Redimensionner seulement si nécessaire
  if (width > maxWidth || height > maxHeight) {
    if (width / maxWidth > height / maxHeight) {
      width = maxWidth;
      height = width / aspectRatio;
    } else {
      height = maxHeight;
      width = height * aspectRatio;
    }
  }

  return {
    width: Math.round(width),
    height: Math.round(height)
  };
}

async function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    canvas.toBlob(
      (blob) => resolve(!!blob),
      'image/webp'
    );
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}