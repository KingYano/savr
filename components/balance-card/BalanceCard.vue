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

        <div class="hidden md:grid grid-cols-3 gap-4 pt-2 border-t" :class="isDarkMode ? 'border-gray-800' : 'border-slate-200'">
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

        <div class="md:hidden flex flex-col space-y-3 pt-2 border-t" :class="isDarkMode ? 'border-gray-800' : 'border-slate-200'">
          <div class="flex justify-between items-center">
            <div class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-slate-600'">
              Entrées
            </div>
            <div class="font-bold text-lg text-emerald-500">
              {{ formatCurrency(monthSummary.income) }}
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-slate-600'">
              Sorties
            </div>
            <div class="font-bold text-lg text-rose-500">
              {{ formatCurrency(monthSummary.expense) }}
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-slate-600'">
              Récurrences
            </div>
            <div class="font-bold text-lg" :class="isDarkMode ? 'text-amber-400' : 'text-amber-500'">
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
  import { useFinance } from '~/composables/useFinance';

  const props = defineProps<BalanceProps>();
  const financeData = useFinance();

  const getMonthBalance = computed(() => {
    if (!props.selectedMonth || isNaN(props.selectedMonth.getTime())) return 0;

    return financeData.getMonthBalance(props.selectedMonth);
  });

  const monthSummary = computed(() => {
    if (!props.selectedMonth || isNaN(props.selectedMonth.getTime())) {
      return { income: 0, expense: 0, recurrent: 0 };
    }

    const monthMovements = financeData.getMonthMovements(props.selectedMonth);

    const income = monthMovements
        .filter(m => m.type === 'income')
        .reduce((total, m) => total + Math.abs(m.amount), 0);

    const expense = monthMovements
        .filter(m => m.type === 'expense')
        .reduce((total, m) => total + Math.abs(m.amount), 0);

    const recurrent = monthMovements
        .filter(m => m.isRecurrent || m.isGeneratedRecurrence)
        .reduce((total, m) => {
          return total + Math.abs(m.amount);
        }, 0);

    return { income, expense, recurrent };
  });
</script>