<template>
  <div :class="[
    'min-h-screen transition-colors duration-300',
    isDarkMode ? 'dark bg-gray-950' : 'bg-slate-50'
  ]">
    <div class="p-6 space-y-6">
      <div class="flex justify-between items-center">
        <div class="space-y-1">
          <div :class="isDarkMode ? 'text-gray-400' : 'text-slate-600'">
            {{ formatFullDate(selectedDate) }}
          </div>
          <h1 :class="[
            'text-4xl font-bold flex items-center gap-2',
            isDarkMode ? 'text-white' : 'text-slate-900'
          ]">
            Bonjour,
            <span>User</span>
          </h1>
        </div>
        <button
            @click="toggleDarkMode"
            :class="[
            'rounded-full p-2',
            isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-slate-200'
          ]"
        >
          <Sun v-if="isDarkMode" class="h-6 w-6 text-yellow-500" />
          <Moon v-else class="h-6 w-6 text-slate-700" />
        </button>
      </div>

      <ClientOnly>
        <BalanceCard
            :movements="financeData.movements.value || []"
            :selected-month="currentMonth"
            :is-dark-mode="isDarkMode"
        />
      </ClientOnly>

      <ClientOnly>
        <FinanceCalendar
            :movements="financeData.movements.value || []"
            :selected-date="selectedDate"
            :current-month="currentMonth"
            :is-dark-mode="isDarkMode"
            @update:selected-date="uiStore.setSelectedDate($event)"
            @update:current-month="uiStore.setCurrentMonth($event)"
        />
      </ClientOnly>

      <ClientOnly>
        <MovementsList
            :movements="financeData.movements.value || []"
            :selected-date="selectedDate"
            :is-dark-mode="isDarkMode"
            @movement-updated="handleMovementUpdated"
        />
      </ClientOnly>
    </div>

    <button
        @click="uiStore.openAddDialog()"
        class="fixed bottom-20 right-6 rounded-full w-12 h-12 shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center"
    >
      <Plus class="h-6 w-6" />
    </button>


    <AddMovementDialog
        :is-open="showAddDialog"
        :is-dark-mode="isDarkMode"
        @update:is-open="uiStore.closeAddDialog"
        @add-movement="handleAddMovement"
    />
  </div>
</template>

<script setup lang="ts">
  import { Sun, Moon, Plus } from 'lucide-vue-next';
  import type { NewMovement } from '~/types/finance';
  import { formatFullDate } from '~/utils/formatters';
  import { useFinance } from '~/composables/useFinance';
  import { useSettingsStore } from '~/stores/settings';
  import { useUIStore } from '~/stores/ui';
  import { storeToRefs } from 'pinia';

  // Stores
  const financeData = useFinance();
  const settingsStore = useSettingsStore();
  const uiStore = useUIStore();
  
  // État réactif depuis les stores
  const { isDarkMode } = storeToRefs(settingsStore);
  const { showAddDialog, selectedDate, currentMonth } = storeToRefs(uiStore);
  
  // Initialiser les dates si nécessaire
  const defaultDate = new Date();
  if (!selectedDate.value || isNaN(selectedDate.value.getTime())) {
    uiStore.setSelectedDate(defaultDate);
  }
  if (!currentMonth.value || isNaN(currentMonth.value.getTime())) {
    uiStore.setCurrentMonth(defaultDate);
  }
  
  // Charger les paramètres au démarrage
  onMounted(() => {
    settingsStore.loadSettings();
  });

  const toggleDarkMode = () => {
    settingsStore.toggleDarkMode();
  };

  const handleAddMovement = async (newMovement: NewMovement) => {
    const success = await financeData.addMovement(newMovement);
    if (success) {
      uiStore.closeAddDialog();
    }
  };

  const handleMovementUpdated = () => {
    // Plus besoin de forcer le re-render avec Pinia
    // La réactivité est automatique
  };
</script>