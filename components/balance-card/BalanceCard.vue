<template>
  <Card class="balance-card" :class="[isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border border-slate-200']">
    <CardContent class="p-6">
      <div class="space-y-4">
        <div class="space-y-2">
          <div :class="isDarkMode ? 'text-gray-400' : 'text-slate-600'">
            Solde pour {{ formatMonthYear(selectedMonth) }}
          </div>
          <div
              :class="[
              'text-xl font-bold',
              getMonthBalance >= 0 ? 'text-emerald-500' : 'text-rose-500'
            ]"
          >
            {{ formatCurrency(getMonthBalance) }}
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 pt-2 border-t" :class="isDarkMode ? 'border-gray-800' : 'border-slate-200'">
          <div class="space-y-1">
            <div class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-slate-600'">
              Entrées
            </div>
            <div class="font-bold text-xl text-emerald-500">
              {{ formatCurrency(monthSummary.income) }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-slate-600'">
              Sorties
            </div>
            <div class="font-bold text-xl text-rose-500">
              {{ formatCurrency(monthSummary.expense) }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-slate-600'">
              Récurrences
            </div>
            <div class="font-bold text-xl" :class="isDarkMode ? 'text-amber-400' : 'text-amber-500'">
              {{ formatCurrency(monthSummary.recurrent) }}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import type { BalanceProps } from '~/types/finance';
import { formatCurrency, formatMonthYear } from '~/utils/formatters';
import { Card, CardContent } from '@/components/ui/card';

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
      .reduce((acc, movement) => {
        const amount = movement.type === 'expense'
            ? -Math.abs(movement.amount)
            : Math.abs(movement.amount);
        return acc + amount;
      }, 0);
});

const monthSummary = computed(() => {
  if (!props.movements || !Array.isArray(props.movements)) {
    return { income: 0, expense: 0, recurrent: 0 };
  }

  const year = props.selectedMonth.getFullYear();
  const month = props.selectedMonth.getMonth();

  const filteredMovements = props.movements.filter(movement => {
    const movementDate = new Date(movement.date);
    return movementDate.getFullYear() === year &&
        movementDate.getMonth() === month;
  });

  const income = filteredMovements
      .filter(m => m.type === 'income')
      .reduce((total, m) => total + Math.abs(m.amount), 0);

  const expense = filteredMovements
      .filter(m => m.type === 'expense')
      .reduce((total, m) => total + Math.abs(m.amount), 0);

  const recurrent = filteredMovements
      .filter(m => m.isRecurrent)
      .reduce((total, m) => {
        const amount = m.type === 'expense'
            ? Math.abs(m.amount)
            : Math.abs(m.amount);
        return total + amount;
      }, 0);

  return { income, expense, recurrent };
});
</script>