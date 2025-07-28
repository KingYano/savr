<template>
  <div class="space-y-6">
    <!-- Cartes de statistiques principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Revenus totaux -->
      <div :class="cardClasses">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p :class="labelClasses">Revenus totaux</p>
              <p :class="valueClasses + ' text-green-500'">
                {{ formatCurrency(chartData.chartStats?.value?.totalIncome || 0) }}
              </p>
              <p :class="subValueClasses">
                Moy: {{ formatCurrency(chartData.chartStats?.value?.averageIncome || 0) }}
              </p>
            </div>
            <div :class="[
              'p-2 rounded-lg',
              isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
            ]">
              <TrendingUp :class="[
                'h-6 w-6',
                isDarkMode ? 'text-green-400' : 'text-green-600'
              ]" />
            </div>
          </div>
        </div>
      </div>

      <!-- Dépenses totales -->
      <div :class="cardClasses">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p :class="labelClasses">Dépenses totales</p>
              <p :class="valueClasses + ' text-red-500'">
                {{ formatCurrency(chartData.chartStats?.value?.totalExpense || 0) }}
              </p>
              <p :class="subValueClasses">
                Moy: {{ formatCurrency(chartData.chartStats?.value?.averageExpense || 0) }}
              </p>
            </div>
            <div :class="[
              'p-2 rounded-lg',
              isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
            ]">
              <TrendingDown :class="[
                'h-6 w-6',
                isDarkMode ? 'text-red-400' : 'text-red-600'
              ]" />
            </div>
          </div>
        </div>
      </div>

      <!-- Balance -->
      <div :class="cardClasses">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p :class="labelClasses">Balance</p>
              <p :class="[
                valueClasses,
                (chartData.chartStats?.value?.balance || 0) >= 0 ? 'text-green-500' : 'text-red-500'
              ]">
                {{ formatCurrency(chartData.chartStats?.value?.balance || 0) }}
              </p>
              <p :class="subValueClasses">
                {{ (chartData.chartStats?.value?.balance || 0) >= 0 ? 'Excédent' : 'Déficit' }}
              </p>
            </div>
            <div :class="[
              'p-2 rounded-lg',
              isDarkMode && (chartData.chartStats?.value?.balance || 0) >= 0 ? 'bg-green-500/20' :
              isDarkMode && (chartData.chartStats?.value?.balance || 0) < 0 ? 'bg-red-500/20' :
              (chartData.chartStats?.value?.balance || 0) >= 0 ? 'bg-green-100' : 'bg-red-100'
            ]">
              <PiggyBank :class="[
                'h-6 w-6',
                isDarkMode && (chartData.chartStats?.value?.balance || 0) >= 0 ? 'text-green-400' :
                isDarkMode && (chartData.chartStats?.value?.balance || 0) < 0 ? 'text-red-400' :
                (chartData.chartStats?.value?.balance || 0) >= 0 ? 'text-green-600' : 'text-red-600'
              ]" />
            </div>
          </div>
        </div>
      </div>

      <!-- Transactions -->
      <div :class="cardClasses">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p :class="labelClasses">Transactions</p>
              <p :class="valueClasses">
                {{ chartData.chartStats?.value?.transactionCount || 0 }}
              </p>
              <p :class="subValueClasses">
                Total des mouvements
              </p>
            </div>
            <div :class="[
              'p-2 rounded-lg',
              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
            ]">
              <Activity :class="[
                'h-6 w-6',
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              ]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphiques principaux -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Répartition des dépenses par catégorie -->
      <div :class="cardClasses">
        <div class="p-6">
          <h3 :class="titleClasses">Dépenses par catégorie</h3>
          <div v-if="chartData.expensesByCategoryChart.length > 0" class="mt-4">
            <PieChart
              :data="chartData.expensesByCategoryChart"
              :is-dark-mode="isDarkMode"
              :height="300"
              :show-legend="true"
            />
          </div>
          <div v-else class="flex items-center justify-center h-64">
            <p :class="subValueClasses">Aucune dépense à afficher</p>
          </div>
        </div>
      </div>

      <!-- Répartition des revenus par catégorie -->
      <div :class="cardClasses">
        <div class="p-6">
          <h3 :class="titleClasses">Revenus par catégorie</h3>
          <div v-if="chartData.incomesByCategoryChart.length > 0" class="mt-4">
            <PieChart
              :data="chartData.incomesByCategoryChart"
              :is-dark-mode="isDarkMode"
              :height="300"
              :show-legend="true"
            />
          </div>
          <div v-else class="flex items-center justify-center h-64">
            <p :class="subValueClasses">Aucun revenu à afficher</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Évolution mensuelle -->
    <div :class="cardClasses">
      <div class="p-6">
        <h3 :class="titleClasses">Évolution mensuelle</h3>
        <div v-if="monthlyDatasets.length > 0 && chartData.monthlyChart.labels?.length > 0" class="mt-4">
          <BarChart
            :labels="chartData.monthlyChart.labels || []"
            :datasets="monthlyDatasets"
            :is-dark-mode="isDarkMode"
            :height="400"
          />
        </div>
        <div v-else class="flex items-center justify-center h-64">
          <p :class="subValueClasses">Pas assez de données pour afficher l'évolution</p>
        </div>
      </div>
    </div>

    <!-- Top catégories et distribution des montants -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top catégories -->
      <div :class="cardClasses">
        <div class="p-6">
          <h3 :class="titleClasses">Top 10 des catégories</h3>
          <div v-if="chartData.topCategoriesChart.length > 0" class="mt-4">
            <div class="space-y-3">
              <div
                v-for="(category, index) in chartData.topCategoriesChart"
                :key="category.label"
                class="flex items-center justify-between"
              >
                <div class="flex items-center gap-3 flex-1">
                  <span class="text-sm font-medium w-6 text-center" :class="subValueClasses">
                    {{ index + 1 }}
                  </span>
                  <div
                    class="w-3 h-3 rounded-full flex-shrink-0"
                    :style="{ backgroundColor: category.color }"
                  ></div>
                  <span class="truncate" :class="isDarkMode ? 'text-white/80' : 'text-gray-700'">
                    {{ category.label }}
                  </span>
                </div>
                <span class="font-medium" :class="isDarkMode ? 'text-white' : 'text-gray-900'">
                  {{ formatCurrency(category.value) }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="flex items-center justify-center h-48">
            <p :class="subValueClasses">Aucune donnée à afficher</p>
          </div>
        </div>
      </div>

      <!-- Distribution des montants -->
      <div :class="cardClasses">
        <div class="p-6">
          <h3 :class="titleClasses">Distribution des montants</h3>
          <div v-if="chartData.amountDistributionChart.length > 0" class="mt-4">
            <PieChart
              :data="chartData.amountDistributionChart"
              :is-dark-mode="isDarkMode"
              :height="300"
              :show-legend="true"
            />
          </div>
          <div v-else class="flex items-center justify-center h-64">
            <p :class="subValueClasses">Aucune donnée à afficher</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, watchEffect } from 'vue';
  import { TrendingUp, TrendingDown, PiggyBank, Activity } from 'lucide-vue-next';
  import PieChart from '~/components/charts/PieChart.vue';
  import BarChart from '~/components/charts/BarChart.vue';
  import type { Movement } from '~/types/finance';
  import type { Category } from '~/types/categories';
  import { formatCurrency } from '~/utils/formatters';
  import { useChartData } from '~/composables/useChartData';

  interface Props {
    movements: Movement[];
    categories: Category[];
    isDarkMode: boolean;
  }

  const props = defineProps<Props>();

  const movementsRef = computed(() => props.movements);
  const categoriesRef = computed(() => props.categories);
  const chartData = useChartData(movementsRef, categoriesRef);
  

  // Classes CSS dynamiques
  const cardClasses = computed(() => [
    'rounded-xl overflow-hidden',
    props.isDarkMode ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-gray-200',
    'border shadow-sm'
  ]);

  const titleClasses = computed(() => [
    'text-lg font-semibold',
    props.isDarkMode ? 'text-white' : 'text-gray-900'
  ]);

  const labelClasses = computed(() => [
    'text-sm font-medium',
    props.isDarkMode ? 'text-white/60' : 'text-gray-600'
  ]);

  const valueClasses = computed(() => [
    'text-2xl font-bold',
    props.isDarkMode ? 'text-white' : 'text-gray-900'
  ]);

  const subValueClasses = computed(() => [
    'text-sm',
    props.isDarkMode ? 'text-white/40' : 'text-gray-500'
  ]);

  // Datasets pour le graphique mensuel
  const monthlyDatasets = computed(() => {
    const monthlyData = chartData.monthlyChart.value || {};
    if (!monthlyData.labels || !monthlyData.labels.length) return [];

    return [
      {
        label: 'Revenus',
        data: monthlyData.income || [],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1
      },
      {
        label: 'Dépenses',
        data: monthlyData.expense || [],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1
      }
    ];
  });
</script>