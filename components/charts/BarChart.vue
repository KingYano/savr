<template>
  <div class="relative">
    <canvas ref="chartCanvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import { formatCurrency } from '~/utils/formatters';

  // Enregistrer tous les composants Chart.js
  Chart.register(...registerables);

  interface BarDataset {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth?: number;
  }

  interface Props {
    labels: string[];
    datasets: BarDataset[];
    title?: string;
    width?: number;
    height?: number;
    isDarkMode?: boolean;
    stacked?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 800,
    height: 400,
    isDarkMode: false,
    stacked: false
  });

  const chartCanvas = ref<HTMLCanvasElement>();
  let chartInstance: Chart | null = null;

  const createChart = async () => {
    if (!chartCanvas.value || props.datasets.length === 0) return;

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
      type: 'bar',
      data: {
        labels: props.labels,
        datasets: props.datasets.map(dataset => ({
          ...dataset,
          borderWidth: dataset.borderWidth || 1,
          borderRadius: 4,
          borderSkipped: false,
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            stacked: props.stacked,
            grid: {
              color: gridColor,
              display: false
            },
            ticks: {
              color: textColor
            },
            title: {
              display: true,
              text: 'Période',
              color: textColor
            }
          },
          y: {
            stacked: props.stacked,
            grid: {
              color: gridColor,
              display: true
            },
            ticks: {
              color: textColor,
              callback: function(value) {
                return formatCurrency(Number(value));
              }
            },
            title: {
              display: true,
              text: 'Montant (€)',
              color: textColor
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: textColor,
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: props.isDarkMode ? '#1F2937' : '#FFFFFF',
            titleColor: textColor,
            bodyColor: textColor,
            borderColor: gridColor,
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  };

  // Watcher pour recréer le graphique quand les données changent
  watch([() => props.datasets, () => props.labels, () => props.isDarkMode], () => {
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