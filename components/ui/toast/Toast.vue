<template>
  <div
    :class="[
      'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border max-w-md transition-all duration-300 transform',
      typeClasses,
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    ]"
    role="alert"
    :aria-live="notification.type === 'error' ? 'assertive' : 'polite'"
  >
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <CheckCircle v-if="notification.type === 'success'" class="h-5 w-5" />
        <AlertCircle v-else-if="notification.type === 'error'" class="h-5 w-5" />
        <AlertTriangle v-else-if="notification.type === 'warning'" class="h-5 w-5" />
        <Info v-else class="h-5 w-5" />
      </div>
      
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium">
          {{ notification.title }}
        </p>
        <p v-if="notification.message" class="mt-1 text-sm opacity-90">
          {{ notification.message }}
        </p>
      </div>
      
      <button
        v-if="!notification.persistent"
        @click="$emit('close')"
        class="flex-shrink-0 rounded-lg p-1 hover:bg-black/10 transition-colors"
        aria-label="Fermer la notification"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
    
    <!-- Barre de progression pour les notifications temporaires -->
    <div
      v-if="!notification.persistent && showProgress"
      class="absolute bottom-0 left-0 h-1 bg-current opacity-30 transition-all ease-linear"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next';
  import type { UINotification } from '~/stores/ui';

  interface Props {
    notification: UINotification;
    showProgress?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    showProgress: true
  });

  const emit = defineEmits<{
    close: [];
  }>();

  const isVisible = ref(false);
  const progress = ref(100);
  let progressInterval: NodeJS.Timeout | null = null;

  // Classes CSS selon le type
  const typeClasses = computed(() => {
    const isDark = true; // TODO: récupérer depuis le store settings
    
    const baseClasses = isDark 
      ? 'border-gray-700 text-white' 
      : 'border-gray-200 text-gray-900';

    switch (props.notification.type) {
      case 'success':
        return `${baseClasses} ${isDark ? 'bg-green-900/90 text-green-100' : 'bg-green-50 text-green-800 border-green-200'}`;
      case 'error':
        return `${baseClasses} ${isDark ? 'bg-red-900/90 text-red-100' : 'bg-red-50 text-red-800 border-red-200'}`;
      case 'warning':
        return `${baseClasses} ${isDark ? 'bg-yellow-900/90 text-yellow-100' : 'bg-yellow-50 text-yellow-800 border-yellow-200'}`;
      default:
        return `${baseClasses} ${isDark ? 'bg-gray-800/90' : 'bg-white'}`;
    }
  });

  onMounted(() => {
    // Animation d'entrée
    setTimeout(() => {
      isVisible.value = true;
    }, 100);

    // Démarrer la barre de progression pour les notifications temporaires
    if (!props.notification.persistent && props.showProgress) {
      const duration = props.notification.duration || 5000;
      const interval = 50; // Mise à jour toutes les 50ms
      const step = (interval / duration) * 100;

      progressInterval = setInterval(() => {
        progress.value -= step;
        if (progress.value <= 0) {
          progress.value = 0;
          emit('close');
        }
      }, interval);
    }
  });

  onUnmounted(() => {
    if (progressInterval) {
      clearInterval(progressInterval);
    }
  });

  // Pause de la barre de progression au survol
  const pauseProgress = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  };

  const resumeProgress = () => {
    if (!props.notification.persistent && !progressInterval && progress.value > 0) {
      const duration = props.notification.duration || 5000;
      const remainingTime = (progress.value / 100) * duration;
      const interval = 50;
      const step = (interval / remainingTime) * progress.value;

      progressInterval = setInterval(() => {
        progress.value -= step;
        if (progress.value <= 0) {
          progress.value = 0;
          emit('close');
        }
      }, interval);
    }
  };
</script>