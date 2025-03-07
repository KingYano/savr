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
            :key="`balance-${rerenderKey}`"
            :movements="financeData.movements.value || []"
            :selected-month="currentMonth"
            :is-dark-mode="isDarkMode"
        />
      </ClientOnly>

      <ClientOnly>
        <FinanceCalendar
            :key="`calendar-${rerenderKey}`"
            :movements="financeData.movements.value || []"
            :selected-date="selectedDate"
            :current-month="currentMonth"
            :is-dark-mode="isDarkMode"
            @update:selected-date="selectedDate = $event"
            @update:current-month="currentMonth = $event"
        />
      </ClientOnly>

      <ClientOnly>
        <MovementsList
            :key="`movements-${rerenderKey}`"
            :movements="financeData.movements.value || []"
            :selected-date="selectedDate"
            :is-dark-mode="isDarkMode"
        />
      </ClientOnly>
    </div>

    <button
        @click="showAddDialog = true"
        class="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center"
    >
      <Plus class="h-6 w-6" />
    </button>

    <AddMovementDialog
        :is-open="showAddDialog"
        :is-dark-mode="isDarkMode"
        @update:is-open="showAddDialog = $event"
        @add-movement="handleAddMovement"
    />
  </div>
</template>

<script setup lang="ts">
import { Sun, Moon, Plus } from 'lucide-vue-next';
import type { NewMovement } from '~/types/finance';
import { formatFullDate } from '~/utils/formatters';
import { useFinance } from '~/composables/useFinance';

const isDarkMode = ref(true);
const showAddDialog = ref(false);
const defaultDate = new Date();
const currentMonth = ref(defaultDate);
const selectedDate = ref(defaultDate);
const rerenderKey = ref(0);

const financeData = useFinance();

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const handleAddMovement = (newMovement: NewMovement) => {
  financeData.addMovement(newMovement);
  showAddDialog.value = false;

  rerenderKey.value++;
};
</script>