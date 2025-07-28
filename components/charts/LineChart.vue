<template>
  <div class="relative">
    <canvas ref="chartCanvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
  import { Chart, registerables } from 'chart.js';
  import 'chartjs-adapter-date-fns';
  import { formatCurrency } from '~/utils/formatters';

  // Enregistrer tous les composants Chart.js
  Chart.register(...registerables);

  interface TimeSeriesData {
    x: Date | string;
    y: number;
  }

  interface LineDataset {
    label: string;
    data: TimeSeriesData[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
  }

  interface Props {
    datasets: LineDataset[];
    title?: string;
    width?: number;
    height?: number;
    isDarkMode?: boolean;
    timeScale?: 'day' | 'week' | 'month';
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 800,
    height: 400,
    isDarkMode: false,
    timeScale: 'day'
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
      type: 'line',
      data: {
        datasets: props.datasets.map(dataset => ({
          ...dataset,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 2,
          tension: 0.1, // Courbes lissées
          pointBackgroundColor: dataset.borderColor,
          pointBorderColor: props.isDarkMode ? '#1F2937' : '#FFFFFF',
          pointBorderWidth: 2
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
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
        scales: {
          x: {
            type: 'time',
            time: {
              unit: props.timeScale,
              displayFormats: {
                day: 'dd/MM',
                week: 'dd/MM',
                month: 'MMM yyyy'
              }
            },
            grid: {
              color: gridColor,
              display: true
            },
            ticks: {
              color: textColor
            },
            title: {
              display: true,
              text: 'Date',
              color: textColor
            }
          },
          y: {
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
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    });
  };

  // Watcher pour recréer le graphique quand les données changent
  watch([() => props.datasets, () => props.isDarkMode], () => {
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