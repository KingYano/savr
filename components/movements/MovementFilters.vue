<template>
  <div class="space-y-4">
    <!-- Barre de recherche principale -->
    <div class="relative">
      <Search :class="['absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4', isDarkMode ? 'text-white/40' : 'text-gray-400']" />
      <Input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Rechercher par nom ou description..."
        class="pl-10 pr-4"
        :class="isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-gray-300'"
      />
      <Button
        v-if="hasActiveFilters"
        variant="ghost"
        size="sm"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
        @click="clearAllFilters"
      >
        <X class="h-4 w-4" />
      </Button>
    </div>

    <!-- Suggestions de recherche -->
    <div v-if="searchSuggestions.length > 0" class="flex flex-wrap gap-1">
      <Button
        v-for="suggestion in searchSuggestions"
        :key="suggestion"
        variant="outline"
        size="sm"
        class="h-6 text-xs"
        @click="setSearchQuery(suggestion)"
      >
        {{ suggestion }}
      </Button>
    </div>

    <!-- Filtres rapides -->
    <div class="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        :class="[
          // Styles de base pour dark mode
          isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : '',
          // Styles actifs
          filters.type === 'expense' 
            ? (isDarkMode ? '!bg-red-500/20 !border-red-400 !text-red-300' : 'bg-red-100 border-red-300 text-red-700')
            : ''
        ]"
        @click="quickFilters.expensesOnly()"
      >
        <TrendingDown class="h-4 w-4 mr-1" />
        Dépenses
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        :class="[
          // Styles de base pour dark mode
          isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : '',
          // Styles actifs
          filters.type === 'income' 
            ? (isDarkMode ? '!bg-green-500/20 !border-green-400 !text-green-300' : 'bg-green-100 border-green-300 text-green-700')
            : ''
        ]"
        @click="quickFilters.incomeOnly()"
      >
        <TrendingUp class="h-4 w-4 mr-1" />
        Revenus
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        :class="[
          // Styles de base pour dark mode
          isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : '',
          // Styles actifs
          filters.isRecurrent === 'yes' 
            ? (isDarkMode ? '!bg-blue-500/20 !border-blue-400 !text-blue-300' : 'bg-blue-100 border-blue-300 text-blue-700')
            : ''
        ]"
        @click="quickFilters.recurrentOnly()"
      >
        <RotateCcw class="h-4 w-4 mr-1" />
        Récurrents
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        :class="[
          isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : ''
        ]"
        @click="quickFilters.thisMonth()"
      >
        <Calendar class="h-4 w-4 mr-1" />
        Ce mois
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        :class="[
          isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : ''
        ]"
        @click="quickFilters.lastMonth()"
      >
        <CalendarDays class="h-4 w-4 mr-1" />
        Mois dernier
      </Button>
    </div>

    <!-- Bouton filtres avancés -->
    <div class="flex items-center justify-between">
      <Button
        variant="outline"
        @click="showAdvancedFilters = !showAdvancedFilters"
        :class="[
          'flex items-center gap-2',
          isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : ''
        ]"
      >
        <Filter class="h-4 w-4" />
        Filtres avancés
        <ChevronDown :class="['h-4 w-4 transition-transform', showAdvancedFilters ? 'rotate-180' : '']" />
      </Button>
      
      <!-- Statistiques des filtres -->
      <div :class="['text-sm', isDarkMode ? 'text-white/60' : 'text-gray-500']">
        {{ filterStats.filteredCount }} / {{ filterStats.totalCount }} mouvements
        <span v-if="filterStats.filteredAmount !== filterStats.totalAmount">
          ({{ formatCurrency(filterStats.filteredAmount) }} / {{ formatCurrency(filterStats.totalAmount) }})
        </span>
      </div>
    </div>

    <!-- Filtres avancés -->
    <div v-show="showAdvancedFilters" class="space-y-4 pt-4 border-t" :class="isDarkMode ? 'border-white/10' : 'border-gray-200'">
        <!-- Filtres par catégories -->
        <div class="space-y-2">
          <CategorySelect
            :model-value="filters.categoryIds?.[0]"
            @update:model-value="handleCategoryChange"
            label="Catégorie"
            placeholder="Toutes les catégories"
            :allow-clear="true"
          />
        </div>

        <!-- Filtres par tags -->
        <div class="space-y-2">
          <TagSelect
            :model-value="filters.tagIds || []"
            @update:model-value="setTagIds"
            label="Tags"
            placeholder="Tous les tags"
            :max-tags="5"
          />
        </div>

        <!-- Plage de dates -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label :class="labelClasses">Date de début</label>
            <Input
              :model-value="dateStartString"
              @update:model-value="handleDateStartChange"
              type="date"
              :class="isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-gray-300'"
            />
          </div>
          <div class="space-y-2">
            <label :class="labelClasses">Date de fin</label>
            <Input
              :model-value="dateEndString"
              @update:model-value="handleDateEndChange"
              type="date"
              :class="isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-gray-300'"
            />
          </div>
        </div>

        <!-- Plage de montants -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label :class="labelClasses">Montant minimum</label>
            <div class="relative">
              <Input
                :model-value="filters.amountRange?.min || ''"
                @update:model-value="handleAmountMinChange"
                type="number"
                placeholder="0"
                min="0"
                step="0.01"
                class="pl-6"
                :class="isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-gray-300'"
              />
              <span :class="['absolute left-2 top-1/2 transform -translate-y-1/2 text-sm', isDarkMode ? 'text-white/40' : 'text-gray-500']">€</span>
            </div>
          </div>
          <div class="space-y-2">
            <label :class="labelClasses">Montant maximum</label>
            <div class="relative">
              <Input
                :model-value="filters.amountRange?.max || ''"
                @update:model-value="handleAmountMaxChange"
                type="number"
                placeholder="∞"
                min="0"
                step="0.01"
                class="pl-6"
                :class="isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-gray-300'"
              />
              <span :class="['absolute left-2 top-1/2 transform -translate-y-1/2 text-sm', isDarkMode ? 'text-white/40' : 'text-gray-500']">€</span>
            </div>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex justify-between">
          <Button variant="outline" @click="clearAllFilters" :class="[
            isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : ''
          ]">
            <X class="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
          
          <div class="flex gap-2">
            <Button variant="outline" size="sm" @click="quickFilters.lastWeek()" :class="[
              isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : ''
            ]">
              Semaine dernière
            </Button>
            <Button variant="outline" size="sm" @click="quickFilters.thisYear()" :class="[
              isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : ''
            ]">
              Cette année
            </Button>
            <Button variant="outline" size="sm" @click="quickFilters.highAmounts()" :class="[
              isDarkMode ? 'border-white/20 text-white/80 hover:bg-white/10 hover:text-white' : ''
            ]">
              Montants élevés
            </Button>
          </div>
        </div>
    </div>

    <!-- Tags de filtres actifs -->
    <div v-if="hasActiveFilters" class="flex flex-wrap gap-2">
      <!-- Tag pour le type -->
      <Button
        v-if="filters.type !== 'all'"
        variant="secondary"
        size="sm"
        @click="clearFilter('type')"
        :class="[
          'h-6 text-xs',
          isDarkMode ? 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20' : ''
        ]"
      >
        {{ filters.type === 'expense' ? 'Dépenses' : 'Revenus' }}
        <X class="h-3 w-3 ml-1" />
      </Button>

      <!-- Tag pour la récurrence -->
      <Button
        v-if="filters.isRecurrent !== 'all'"
        variant="secondary"
        size="sm"
        @click="clearFilter('isRecurrent')"
        :class="[
          'h-6 text-xs',
          isDarkMode ? 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20' : ''
        ]"
      >
        {{ filters.isRecurrent === 'yes' ? 'Récurrents' : 'Non récurrents' }}
        <X class="h-3 w-3 ml-1" />
      </Button>

      <!-- Tag pour la plage de dates -->
      <Button
        v-if="filters.dateRange?.start || filters.dateRange?.end"
        variant="secondary"
        size="sm"
        @click="clearFilter('dateRange')"
        :class="[
          'h-6 text-xs',
          isDarkMode ? 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20' : ''
        ]"
      >
        Dates: {{ formatDateRange() }}
        <X class="h-3 w-3 ml-1" />
      </Button>

      <!-- Tag pour la plage de montants -->
      <Button
        v-if="filters.amountRange?.min !== null || filters.amountRange?.max !== null"
        variant="secondary"
        size="sm"
        @click="clearFilter('amountRange')"
        :class="[
          'h-6 text-xs',
          isDarkMode ? 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20' : ''
        ]"
      >
        Montants: {{ formatAmountRange() }}
        <X class="h-3 w-3 ml-1" />
      </Button>

      <!-- Tags pour les catégories -->
      <Button
        v-if="filters.categoryIds?.length > 0"
        variant="secondary"
        size="sm"
        @click="clearFilter('categoryIds')"
        :class="[
          'h-6 text-xs',
          isDarkMode ? 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20' : ''
        ]"
      >
        {{ filters.categoryIds?.length || 0 }} catégorie(s)
        <X class="h-3 w-3 ml-1" />
      </Button>

      <!-- Tags pour les tags -->
      <Button
        v-if="filters.tagIds?.length > 0"
        variant="secondary"
        size="sm"
        @click="clearFilter('tagIds')"
        :class="[
          'h-6 text-xs',
          isDarkMode ? 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20' : ''
        ]"
      >
        {{ filters.tagIds?.length || 0 }} tag(s)
        <X class="h-3 w-3 ml-1" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { 
    Search, X, Filter, ChevronDown, TrendingDown, TrendingUp, 
    RotateCcw, Calendar, CalendarDays 
  } from 'lucide-vue-next';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import CategorySelect from '~/components/categories/CategorySelect.vue';
  import TagSelect from '~/components/categories/TagSelect.vue';
  import { useSettingsStore } from '~/stores/settings';
  import { storeToRefs } from 'pinia';
  import type { MovementFilters, FilterStats } from '~/composables/useMovementFilters';

  interface QuickFilters {
    thisMonth: () => void;
    lastMonth: () => void;
    lastWeek: () => void;
    thisYear: () => void;
    expensesOnly: () => void;
    incomeOnly: () => void;
    recurrentOnly: () => void;
    highAmounts: () => void;
  }

  interface Props {
    filters: MovementFilters;
    filterStats: FilterStats;
    searchSuggestions: string[];
    hasActiveFilters: boolean;
    searchQuery: string;
    // Actions
    setSearchQuery: (query: string) => void;
    setCategoryIds: (ids: string[]) => void;
    setTagIds: (ids: string[]) => void;
    setDateRange: (start: Date | null, end: Date | null) => void;
    setAmountRange: (min: number | null, max: number | null) => void;
    clearAllFilters: () => void;
    clearFilter: (filterType: keyof MovementFilters) => void;
    quickFilters: QuickFilters;
  }

  const props = defineProps<Props>();

  const settingsStore = useSettingsStore();
  const { isDarkMode } = storeToRefs(settingsStore);

  const showAdvancedFilters = ref(false);

  // Formatage des dates pour les inputs
  const dateStartString = computed({
    get: () => props.filters.dateRange?.start?.toISOString().split('T')[0] || '',
    set: (value: string) => {
      const start = value ? new Date(value) : null;
      props.setDateRange(start, props.filters.dateRange?.end);
    }
  });

  const dateEndString = computed({
    get: () => props.filters.dateRange?.end?.toISOString().split('T')[0] || '',
    set: (value: string) => {
      const end = value ? new Date(value) : null;
      props.setDateRange(props.filters.dateRange?.start, end);
    }
  });

  // Classes pour les labels
  const labelClasses = computed(() => [
    'text-sm font-medium',
    isDarkMode.value ? 'text-white' : 'text-gray-900'
  ]);

  // Gestion des changements
  const handleCategoryChange = (categoryId: string | undefined) => {
    props.setCategoryIds(categoryId ? [categoryId] : []);
  };

  const handleDateStartChange = (value: string) => {
    const start = value ? new Date(value) : null;
    props.setDateRange(start, props.filters.dateRange?.end);
  };

  const handleDateEndChange = (value: string) => {
    const end = value ? new Date(value) : null;
    props.setDateRange(props.filters.dateRange?.start, end);
  };

  const handleAmountMinChange = (value: string) => {
    const min = value ? parseFloat(value) : null;
    props.setAmountRange(min, props.filters.amountRange?.max);
  };

  const handleAmountMaxChange = (value: string) => {
    const max = value ? parseFloat(value) : null;
    props.setAmountRange(props.filters.amountRange?.min, max);
  };

  // Formatage pour l'affichage
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDateRange = () => {
    const start = props.filters.dateRange?.start;
    const end = props.filters.dateRange?.end;
    
    if (start && end) {
      return `${start.toLocaleDateString('fr-FR')} - ${end.toLocaleDateString('fr-FR')}`;
    } else if (start) {
      return `Depuis ${start.toLocaleDateString('fr-FR')}`;
    } else if (end) {
      return `Jusqu'au ${end.toLocaleDateString('fr-FR')}`;
    }
    return '';
  };

  const formatAmountRange = () => {
    const min = props.filters.amountRange?.min;
    const max = props.filters.amountRange?.max;
    
    if (min !== null && max !== null) {
      return `${formatCurrency(min)} - ${formatCurrency(max)}`;
    } else if (min !== null) {
      return `> ${formatCurrency(min)}`;
    } else if (max !== null) {
      return `< ${formatCurrency(max)}`;
    }
    return '';
  };
</script>