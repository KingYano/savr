<!-- components/MovementsList.vue -->
<template>
  <div class="space-y-4">
    <h2 :class="[
      'text-2xl font-semibold',
      isDarkMode ? 'text-white' : 'text-slate-900'
    ]">
      Mouvements du {{ formatDate(selectedDate) }}
    </h2>

    <template v-if="dailyMovements.length > 0">
      <Card
          v-for="movement in dailyMovements"
          :key="movement.id"
          :class="[
          'shadow-sm hover:shadow transition-shadow',
          isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border border-slate-200'
        ]"
      >
        <CardContent class="p-4 flex justify-between items-center">
          <div class="flex items-center gap-4">
            <div :class="[
              'w-12 h-12 rounded-full flex items-center justify-center',
              isDarkMode ? 'bg-gray-800' : 'bg-slate-100'
            ]">
              {{ movement.type === 'expense' ? '-' : '+' }}
            </div>
            <div>
              <div :class="[
                'font-medium',
                isDarkMode ? 'text-white' : 'text-slate-900'
              ]">
                {{ movement.name }}
              </div>
              <div :class="[
                'text-sm',
                isDarkMode ? 'text-gray-400' : 'text-slate-500'
              ]">
                {{ formatDate(new Date(movement.date)) }}
              </div>
            </div>
          </div>
          <div :class="[
            'text-lg font-semibold',
            movement.amount < 0 ? 'text-rose-500' : 'text-emerald-500'
          ]">
            {{ formatCurrency(movement.amount) }}
          </div>
        </CardContent>
      </Card>
    </template>

    <div
        v-else
        :class="[
        'text-center py-8',
        isDarkMode ? 'text-gray-400' : 'text-slate-600'
      ]"
    >
      Aucun mouvement pour cette date
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MovementsListProps } from '~/types/finance';
import { formatCurrency, formatDate } from '~/utils/formatters';

const props = defineProps<MovementsListProps>();

const dailyMovements = computed(() => {
  if (!props.movements || !Array.isArray(props.movements)) return [];
  return props.movements.filter(movement => {
    const movementDate = new Date(movement.date);
    return movementDate.toDateString() === props.selectedDate?.toDateString();
  });
});
</script>