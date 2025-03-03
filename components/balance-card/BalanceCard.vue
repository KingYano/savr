<template>
  <Card class="balance-card" :class="[isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border border-slate-200']">
    <CardContent class="p-6">
      <div class="space-y-2">
        <div :class="isDarkMode ? 'text-gray-400' : 'text-slate-600'">
          Solde pour {{ formatMonthYear(selectedMonth) }}
        </div>
        <div
            :class="[
            'text-3xl font-bold',
            getMonthBalance >= 0 ? 'text-emerald-500' : 'text-rose-500'
          ]"
        >
          {{ formatCurrency(getMonthBalance) }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  import type { BalanceProps } from '~/types/finance';
  import { formatCurrency, formatMonthYear } from '~/utils/formatters';

  const props = defineProps<BalanceProps>();

  const getMonthBalance = computed(() => {
    if (!props.movements || !Array.isArray(props.movements)) return 0;

    const year = props.selectedMonth.getFullYear();
    const month = props.selectedMonth.getMonth();

    return props.movements
        .filter(movement => {
          const movementDate = new Date(movement.date);
          return movementDate.getFullYear() === year &&
              movementDate.getMonth() === month;
        })
        .reduce((acc, movement) => acc + movement.amount, 0);
  });
</script>