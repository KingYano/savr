<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="loading">
        <div
          v-if="uiStore.isLoading"
          class="fixed inset-0 z-50 flex items-center justify-center"
          :class="isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'"
          role="dialog"
          aria-labelledby="loading-title"
          aria-describedby="loading-description"
        >
        <div
          class="p-6 rounded-lg shadow-xl"
          :class="isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
        >
          <div class="flex items-center space-x-4">
            <!-- Spinner animé -->
            <div
              class="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"
              :class="isDarkMode ? 'border-gray-300' : 'border-gray-600'"
            />
            
            <div>
              <h3 id="loading-title" class="text-lg font-medium">
                Chargement en cours...
              </h3>
              <p
                v-if="uiStore.loadingMessage"
                id="loading-description"
                class="text-sm opacity-75 mt-1"
              >
                {{ uiStore.loadingMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { useUIStore } from '~/stores/ui';
  import { useSettingsStore } from '~/stores/settings';
  import { storeToRefs } from 'pinia';

  const uiStore = useUIStore();
  const settingsStore = useSettingsStore();
  
  const { isDarkMode } = storeToRefs(settingsStore);
</script>

<style scoped>
  .loading-enter-active,
  .loading-leave-active {
    transition: opacity 0.3s ease;
  }

  .loading-enter-from,
  .loading-leave-to {
    opacity: 0;
  }
</style>