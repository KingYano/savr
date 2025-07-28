<template>
  <div :class="[
    'min-h-screen transition-colors duration-300',
    isDarkMode ? 'dark bg-[#080808]' : 'bg-slate-50'
  ]">
    <div class="p-6 space-y-6">
      <!-- En-tête -->
      <div class="flex justify-between items-center">
        <div class="space-y-1">
          <h1 :class="[
            'text-3xl font-bold',
            isDarkMode ? 'text-white' : 'text-slate-900'
          ]">
            Statistiques et Analyses
          </h1>
          <p :class="isDarkMode ? 'text-white/60' : 'text-slate-600'">
            Visualisez vos données financières avec des graphiques détaillés
          </p>
        </div>
        
        <div class="flex items-center gap-3">
          <!-- Bouton retour -->
          <NuxtLink
            to="/"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg',
              isDarkMode ? 'bg-[#242424] hover:bg-[#3D3D3D] text-white border-white/10' : 'bg-white hover:bg-gray-50 text-gray-900 border-gray-200',
              'border transition-colors'
            ]"
          >
            <ArrowLeft class="h-4 w-4" />
            Retour
          </NuxtLink>

        </div>
      </div>

      <!-- Filtres pour la période d'analyse -->
      <div :class="[
        'rounded-xl p-4',
        isDarkMode ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-gray-200',
        'border'
      ]">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex items-center gap-2">
            <label :class="[
              'text-sm font-medium',
              isDarkMode ? 'text-white' : 'text-gray-900'
            ]">
              Période d'analyse:
            </label>
            
            <div class="flex gap-2">
              <Button
                v-for="period in analysisperiods"
                :key="period.value"
                variant="outline"
                size="sm"
                :class="[
                  // Styles de base pour dark mode
                  isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : '',
                  // Styles actifs
                  selectedPeriod === period.value 
                    ? (isDarkMode ? '!bg-blue-500/20 !border-blue-400 !text-blue-300' : 'bg-blue-100 border-blue-300 text-blue-700')
                    : ''
                ]"
                @click="setAnalysisPeriod(period.value)"
              >
                {{ period.label }}
              </Button>
            </div>
          </div>
          

          <!-- Filtres de dates personnalisées -->
          <div v-if="selectedPeriod === 'custom'" class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm" :class="isDarkMode ? 'text-white/80' : 'text-gray-700'">
                Du:
              </label>
              <Input
                v-model="customDateRange.start"
                type="date"
                class="w-40"
                :class="isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-gray-300'"
              />
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm" :class="isDarkMode ? 'text-white/80' : 'text-gray-700'">
                Au:
              </label>
              <Input
                v-model="customDateRange.end"
                type="date"
                class="w-40"
                :class="isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-gray-300'"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard des statistiques -->
      <ClientOnly>
        <StatsDashboard
          :movements="filteredMovementsForStats"
          :categories="categories"
          :is-dark-mode="isDarkMode"
        />
      </ClientOnly>
    </div>

    <!-- Navigation flottante -->
    <FloatingNav
      :is-dark-mode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode"
      @add-movement="() => $router.push('/')"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { ArrowLeft } from 'lucide-vue-next';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import StatsDashboard from '~/components/dashboard/StatsDashboard.vue';
  import FloatingNav from '~/components/ui/FloatingNav.vue';
  import { useFinance } from '~/composables/useFinance';
  import { useSettingsStore } from '~/stores/settings';
  import { useCategoriesStore } from '~/stores/categories';
  import { storeToRefs } from 'pinia';

  // Stores
  const financeData = useFinance();
  const settingsStore = useSettingsStore();
  const categoriesStore = useCategoriesStore();
  
  // État réactif
  const { isDarkMode } = storeToRefs(settingsStore);
  const { categories } = storeToRefs(categoriesStore);

  // Périodes d'analyse prédéfinies
  const analysisperiods = [
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' },
    { value: 'all', label: 'Tout' },
    { value: 'custom', label: 'Personnalisé' }
  ];

  const selectedPeriod = ref('all');
  const customDateRange = ref({
    start: '',
    end: ''
  });

  // Fonction pour changer la période d'analyse
  const setAnalysisPeriod = (period: string) => {
    selectedPeriod.value = period;
    
    // Réinitialiser les dates personnalisées si on change de période
    if (period !== 'custom') {
      customDateRange.value = { start: '', end: '' };
    }
  };

  // Calculer la plage de dates selon la période sélectionnée
  const getDateRange = () => {
    const now = new Date();
    let start: Date;
    let end: Date = now;

    switch (selectedPeriod.value) {
      case 'week':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        start = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case 'year':
        start = new Date(now.getFullYear(), 0, 1);
        break;
      case 'custom':
        if (customDateRange.value.start && customDateRange.value.end) {
          start = new Date(customDateRange.value.start);
          end = new Date(customDateRange.value.end);
        } else {
          return null; // Dates personnalisées incomplètes
        }
        break;
      case 'all':
      default:
        return null; // Pas de filtre de date
    }

    return { start, end };
  };

  // Mouvements filtrés selon la période sélectionnée
  const filteredMovementsForStats = computed(() => {
    const movements = financeData.movements.value || [];
    
    const dateRange = getDateRange();
    
    if (!dateRange) {
      return movements; // Pas de filtre, retourner tous les mouvements
    }

    const filtered = movements.filter(movement => {
      const movementDate = movement.date instanceof Date 
        ? movement.date 
        : new Date(movement.date);
      
      
      if (isNaN(movementDate.getTime())) return false;
      
      return movementDate >= dateRange.start && movementDate <= dateRange.end;
    });
    
    return filtered;
  });

  const toggleDarkMode = () => {
    settingsStore.toggleDarkMode();
  };


  // Métadonnées pour la page
  useHead({
    title: 'Statistiques - SAVR',
    meta: [
      {
        name: 'description',
        content: 'Visualisez vos données financières avec des graphiques détaillés et des analyses complètes.'
      }
    ]
  });
</script>