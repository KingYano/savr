<template>
  <div>
    <NuxtPage />
    <ToastContainer />
    <LoadingOverlay />
  </div>
</template>

<script setup lang="ts">
  import { ToastContainer } from '~/components/ui/toast';
  import LoadingOverlay from '~/components/LoadingOverlay.vue';
  
  // Métadonnées de l'application
  useHead({
    title: 'SAVR - Gestion Financière',
    meta: [
      { name: 'description', content: 'Application de gestion financière personnelle' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  });
</script>
