<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <TransitionGroup
        name="toast"
        tag="div"
        class="space-y-2"
      >
        <div
          v-for="notification in uiStore.activeNotifications"
          :key="notification.id"
          class="pointer-events-auto"
        >
          <Toast
            :notification="notification"
            @close="uiStore.removeNotification(notification.id)"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { useUIStore } from '~/stores/ui';
  import Toast from './Toast.vue';

  const uiStore = useUIStore();
</script>

<style scoped>
  /* Animations pour les transitions */
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }

  .toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }

  .toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  .toast-move {
    transition: transform 0.3s ease;
  }
</style>