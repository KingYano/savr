<template>
  <div :class="[
    'min-h-screen transition-colors duration-300',
    isDarkMode ? 'dark bg-[#080808]' : 'bg-slate-50'
  ]">
    <div class="p-6 space-y-6">
      <div class="flex justify-between items-center">
        <div class="space-y-1">
          <div :class="isDarkMode ? 'text-white/60' : 'text-slate-600'">
            {{ formatFullDate(selectedDate) }}
          </div>
          <h1 :class="[
            'text-4xl font-bold flex items-center gap-2',
            isDarkMode ? 'text-white' : 'text-slate-900'
          ]">
            Bonjour,
            <span>User</span>
          </h1>
        </div>
      </div>


      <ClientOnly>
        <BalanceCard
            :movements="financeData.movements.value || []"
            :selected-month="currentMonth"
            :is-dark-mode="isDarkMode"
        />
      </ClientOnly>

      <ClientOnly>
        <FinanceCalendar
            :movements="financeData.movements.value || []"
            :selected-date="selectedDate"
            :current-month="currentMonth"
            :is-dark-mode="isDarkMode"
            @update:selected-date="uiStore.setSelectedDate($event)"
            @update:current-month="uiStore.setCurrentMonth($event)"
        />
      </ClientOnly>

      <!-- Système de recherche et filtres -->
      <ClientOnly>
        <div :class="[
          'rounded-xl overflow-hidden',
          isDarkMode ? 'bg-[#1A1A1A] border-white/10 border' : 'bg-white border-gray-200 border'
        ]">
          <div class="p-4">
            <h2 :class="[
              'text-xl font-semibold mb-4',
              isDarkMode ? 'text-white' : 'text-gray-900'
            ]">
              Mouvements
            </h2>
            
            <!-- Composant de filtres -->
            <MovementFilters
              v-if="movementFilters"
              :filters="movementFilters.filters?.value || {}"
              :filter-stats="movementFilters.filterStats?.value || {}"
              :search-suggestions="movementFilters.searchSuggestions?.value || []"
              :has-active-filters="movementFilters.hasActiveFilters?.value || false"
              :search-query="movementFilters.filters?.value?.searchQuery || ''"
              :set-search-query="movementFilters.setSearchQuery"
              :set-category-ids="movementFilters.setCategoryIds"
              :set-tag-ids="movementFilters.setTagIds"
              :set-date-range="movementFilters.setDateRange"
              :set-amount-range="movementFilters.setAmountRange"
              :clear-all-filters="movementFilters.clearAllFilters"
              :clear-filter="movementFilters.clearFilter"
              :quick-filters="movementFilters.quickFilters"
            />
          </div>
          
          <!-- Liste des mouvements filtrés -->
          <div class="divide-y" :class="isDarkMode ? 'divide-white/5' : 'divide-gray-100'">
            <div v-for="movement in filteredMovementsForDisplay" :key="movement.id" class="p-4 flex items-center gap-3">
              <div
                  :class="[
                  'w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center relative',
                  isDarkMode && movement.type === 'income' ? 'bg-green-500/20' : movement.type === 'income' ? 'bg-green-100' : '',
                  isDarkMode && movement.type === 'expense' ? 'bg-red-500/20' : movement.type === 'expense' ? 'bg-red-100' : ''
                ]"
              >
                <img
                    v-if="movement.imageUrl && movement.imageUrl.length > 0"
                    :src="movement.imageUrl"
                    alt=""
                    class="w-full h-full object-cover rounded-full cursor-pointer"
                    @click="openImagePreview(movement.imageUrl)"
                />
                <ArrowDownCircle v-else-if="movement.type === 'expense'" class="w-6 h-6" :class="isDarkMode ? 'text-red-400' : 'text-red-500'" />
                <ArrowUpCircle v-else class="w-6 h-6" :class="isDarkMode ? 'text-green-400' : 'text-green-500'" />

                <div v-if="movement.isRecurrent || movement.isGeneratedRecurrence"
                     class="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                  <Repeat class="w-3 h-3 text-white" />
                </div>
              </div>

              <div class="flex-1">
                <div :class="[
                  isDarkMode ? 'text-white' : 'text-gray-900',
                  'flex items-center gap-1'
                ]">
                  {{ movement.name }}
                  <span v-if="movement.isRecurrent || movement.isGeneratedRecurrence"
                        class="text-xs px-1.5 py-0.5 rounded-full"
                        :class="isDarkMode ? 'bg-[#242424] text-white/60' : 'bg-gray-200 text-gray-600'">
                    Récurrent
                  </span>
                </div>
                <div class="text-sm" :class="isDarkMode ? 'text-white/60' : 'text-gray-500'">
                  {{ formatDate(new Date(movement.date)) }} • {{ movement.type === 'expense' ? 'Dépense' : 'Revenu' }}
                  <span v-if="movement.description" class="ml-2">
                    • {{ movement.description }}
                  </span>
                </div>
                
                <!-- Tags du mouvement -->
                <div v-if="movement.tags && movement.tags.length > 0" class="flex flex-wrap gap-1 mt-1">
                  <span
                    v-for="tagId in movement.tags"
                    :key="tagId"
                    class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium"
                    :style="getTagStyle(tagId)"
                  >
                    {{ getTagName(tagId) }}
                  </span>
                </div>
              </div>

              <div
                  :class="[
                  'font-semibold',
                  movement.type === 'income' ? 'text-green-500' : 'text-red-500'
                ]"
              >
                {{ formatCurrency(movement.amount) }}
              </div>

              <div v-if="!movement.isGeneratedRecurrence" class="flex items-center">
                <button
                    @click="editMovement(movement)"
                    class="p-2 rounded-full"
                    :class="isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'"
                >
                  <Edit3 class="h-4 w-4" :class="isDarkMode ? 'text-white/60' : 'text-gray-600'" />
                </button>
              </div>
            </div>

            <div v-if="filteredMovementsForDisplay.length === 0" class="p-6 text-center">
              <div :class="isDarkMode ? 'text-white/60' : 'text-gray-500'">
                {{ movementFilters?.hasActiveFilters ? 'Aucun mouvement ne correspond aux filtres' : 'Aucun mouvement trouvé' }}
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>

    <!-- Navigation flottante -->
    <FloatingNav
      :is-dark-mode="isDarkMode"
      @toggle-dark-mode="toggleDarkMode"
      @add-movement="uiStore.openAddDialog()"
    />


    <!-- Dialogue d'ajout de mouvement -->
    <AddMovementDialog
        :is-open="showAddDialog"
        :is-dark-mode="isDarkMode"
        @update:is-open="uiStore.closeAddDialog"
        @add-movement="handleAddMovement"
    />

    <!-- Dialogue d'aperçu d'image -->
    <Dialog :open="!!previewImageUrl && previewImageUrl.length > 0" @update:open="previewImageUrl = ''">
      <DialogContent :class="isDarkMode ? 'dark bg-[#1A1A1A]' : 'bg-white'" class="max-w-2xl">
        <DialogHeader>
          <DialogTitle :class="isDarkMode ? 'text-white' : 'text-gray-900'">Aperçu de l'image</DialogTitle>
        </DialogHeader>
        <div class="flex justify-center">
          <img :src="previewImageUrl" alt="Aperçu" class="max-h-80 max-w-full object-contain" />
        </div>
        <DialogFooter>
          <Button @click="previewImageUrl = ''">Fermer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Dialogue d'édition de mouvement -->
    <EditMovementDialog
        :is-open="showEditDialog"
        :is-dark-mode="isDarkMode"
        :movement="selectedMovement"
        @update:is-open="showEditDialog = $event"
        @save-movement="handleSaveMovement"
        @delete-movement="handleDeleteMovement"
    />
  </div>
</template>

<script setup lang="ts">
  import { Sun, Moon, Plus, ArrowDownCircle, ArrowUpCircle, Repeat, Edit3, BarChart3 } from 'lucide-vue-next';
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import type { NewMovement, Movement } from '~/types/finance';
  import { formatFullDate, formatCurrency, formatDate } from '~/utils/formatters';
  import { useFinance } from '~/composables/useFinance';
  import { useMovementFilters } from '~/composables/useMovementFilters';
  import { useSettingsStore } from '~/stores/settings';
  import { useUIStore } from '~/stores/ui';
  import { useCategoriesStore } from '~/stores/categories';
  import { storeToRefs } from 'pinia';
  import MovementFilters from '~/components/movements/MovementFilters.vue';
  import EditMovementDialog from '~/components/edit-movement-dialog/EditMovementDialog.vue';
  import FloatingNav from '~/components/ui/FloatingNav.vue';

  // Stores
  const financeData = useFinance();
  const settingsStore = useSettingsStore();
  const uiStore = useUIStore();
  const categoriesStore = useCategoriesStore();
  
  // État réactif depuis les stores
  const { isDarkMode } = storeToRefs(settingsStore);
  const { showAddDialog, selectedDate, currentMonth } = storeToRefs(uiStore);
  
  // Système de filtres
  const movementFilters = useMovementFilters(financeData.movements);
  
  // État pour la gestion des modales
  const previewImageUrl = ref<string>('');
  const showEditDialog = ref(false);
  const selectedMovement = ref<Movement | null>(null);

  // Computed property pour les mouvements filtrés avec sécurité
  const filteredMovementsForDisplay = computed(() => {
    try {
      if (!movementFilters || !movementFilters.filteredMovements) {
        return [];
      }
      
      const filtered = movementFilters.filteredMovements;
      
      // Si c'est déjà un tableau
      if (Array.isArray(filtered)) {
        return filtered.filter(m => m && m.id !== undefined && m.id !== null);
      }
      
      // Si c'est une computed property
      if (filtered.value && Array.isArray(filtered.value)) {
        return filtered.value.filter(m => m && m.id !== undefined && m.id !== null);
      }
      
      return [];
    } catch (error) {
      console.error('Erreur filtrage mouvements:', error);
      return [];
    }
  });
  
  // Initialiser les dates si nécessaire
  const defaultDate = new Date();
  if (!selectedDate.value || isNaN(selectedDate.value.getTime())) {
    uiStore.setSelectedDate(defaultDate);
  }
  if (!currentMonth.value || isNaN(currentMonth.value.getTime())) {
    uiStore.setCurrentMonth(defaultDate);
  }
  
  onMounted(() => {
    settingsStore.loadSettings();
  });

  const toggleDarkMode = () => {
    settingsStore.toggleDarkMode();
  };

  const handleAddMovement = async (newMovement: NewMovement) => {
    const success = await financeData.addMovement(newMovement);
    if (success) {
      uiStore.closeAddDialog();
    }
  };


  // Fonctions pour les tags
  const getTagName = (tagId: string) => {
    const tag = categoriesStore.getTagById(tagId);
    return tag?.name || 'Tag inconnu';
  };

  const getTagStyle = (tagId: string) => {
    const tag = categoriesStore.getTagById(tagId);
    if (!tag) return {};
    
    return {
      backgroundColor: `${tag.color}20`,
      color: tag.color,
      border: `1px solid ${tag.color}40`
    };
  };

  // Fonctions pour les images
  const openImagePreview = (url: string) => {
    if (url && url.length > 0 && !url.startsWith('blob:')) {
      previewImageUrl.value = url;
    } else {
      console.error('URL d\'image invalide:', url);
    }
  };

  // Fonctions pour l'édition
  const editMovement = (movement: Movement) => {
    if (movement.isGeneratedRecurrence) {
      return;
    }

    selectedMovement.value = movement;
    showEditDialog.value = true;
  };

  const handleSaveMovement = (updatedMovement: Movement) => {
    if (financeData.updateMovement(updatedMovement)) {
      showEditDialog.value = false;
      selectedMovement.value = null;
    }
  };

  const handleDeleteMovement = (id: number) => {
    financeData.deleteMovement(id);
    showEditDialog.value = false;
    selectedMovement.value = null;
  };

</script>