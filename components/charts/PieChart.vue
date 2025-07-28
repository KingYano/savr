<template>
  <div class="relative">
    <canvas ref="chartCanvas" :width="width" :height="height"></canvas>
    
    <!-- Légende personnalisée -->
    <div v-if="showLegend && data.length > 0" class="mt-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div
          v-for="(item, index) in data"
          :key="item.label"
          class="flex items-center gap-2 text-sm"
        >
          <div
            class="w-3 h-3 rounded-full flex-shrink-0"
            :style="{ backgroundColor: item.color || chartColors[index % chartColors.length] }"
          ></div>
          <span :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" class="truncate">
            {{ item.label }}
          </span>
          <span :class="isDarkMode ? 'text-white' : 'text-gray-900'" class="font-medium ml-auto">
            {{ formatCurrency(item.value) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import type { ChartDataPoint } from '~/composables/useChartData';
  import { formatCurrency } from '~/utils/formatters';

  // Enregistrer tous les composants Chart.js
  Chart.register(...registerables);

  interface Props {
    data: ChartDataPoint[];
    title?: string;
    width?: number;
    height?: number;
    showLegend?: boolean;
    isDarkMode?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 400,
    height: 400,
    showLegend: true,
    isDarkMode: false
  });

  const chartCanvas = ref<HTMLCanvasElement>();
  let chartInstance: Chart | null = null;

  // Couleurs par défaut pour les graphiques
  const chartColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
    '#14B8A6', '#F43F5E', '#8B5A2B', '#6B7280', '#7C3AED'
  ];

  const createChart = async () => {
    if (!chartCanvas.value || props.data.length === 0) return;

    // Détruire le graphique existant
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    await nextTick();

    const ctx = chartCanvas.value.getContext('2d');
    if (!ctx) return;

    // Couleurs du thème
    const textColor = props.isDarkMode ? '#F3F4F6' : '#1F2937';
    const gridColor = props.isDarkMode ? '#374151' : '#E5E7EB';

    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: props.data.map(item => item.label),
        datasets: [{
          data: props.data.map(item => item.value),
          backgroundColor: props.data.map((item, index) => 
            item.color || chartColors[index % chartColors.length]
          ),
          borderColor: props.isDarkMode ? '#1F2937' : '#FFFFFF',
          borderWidth: 2,
          hoverBorderWidth: 3,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Utiliser notre légende personnalisée
          },
          tooltip: {
            backgroundColor: props.isDarkMode ? '#1F2937' : '#FFFFFF',
            titleColor: textColor,
            bodyColor: textColor,
            borderColor: gridColor,
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                const value = context.parsed;
                const total = props.data.reduce((sum, item) => sum + item.value, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
              }
            }
          }
        },
        cutout: '60%', // Taille du trou central
        animation: {
          animateRotate: true,
          duration: 1000
        }
      }
    });
  };

  // Watcher pour recréer le graphique quand les données changent
  watch([() => props.data, () => props.isDarkMode], () => {
    createChart();
  }, { deep: true });

  onMounted(() => {
    createChart();
  });

  onUnmounted(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  });
</script>