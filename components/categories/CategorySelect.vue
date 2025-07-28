<template>
  <div class="space-y-2">
    <label v-if="label" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <Popover>
      <PopoverTrigger as-child>
        <Button 
          variant="outline" 
          role="combobox"
          :class="[
            'w-full justify-between',
            !selectedCategory && 'text-muted-foreground',
            isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'
          ]"
        >
          <div v-if="selectedCategory" class="flex items-center gap-2">
            <span class="text-lg">{{ selectedCategory.icon }}</span>
            <span>{{ selectedCategory.name }}</span>
            <span 
              class="w-3 h-3 rounded-full flex-shrink-0" 
              :style="{ backgroundColor: selectedCategory.color }"
            />
          </div>
          <span v-else>{{ placeholder }}</span>
          <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent class="w-80 p-0" align="start">
        <div :class="isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'">
          <!-- Recherche -->
          <div class="p-2 border-b" :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'">
            <div class="relative">
              <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                v-model="searchQuery"
                placeholder="Rechercher une catégorie..."
                class="pl-8"
                :class="isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'"
              />
            </div>
          </div>
          
          <!-- Liste des catégories -->
          <div class="max-h-60 overflow-auto">
            <div v-if="filteredCategories.length === 0" class="p-4 text-center text-muted-foreground">
              Aucune catégorie trouvée
            </div>
            
            <div v-else class="p-1">
              <!-- Catégories de dépenses -->
              <div v-if="showExpenseCategories">
                <div class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Dépenses
                </div>
                <Button
                  v-for="category in expenseCategories"
                  :key="category.id"
                  variant="ghost"
                  class="w-full justify-start h-auto p-2 mb-1"
                  @click="selectCategory(category)"
                >
                  <div class="flex items-center gap-3 w-full">
                    <span class="text-lg flex-shrink-0">{{ category.icon }}</span>
                    <div class="flex-1 text-left">
                      <div class="font-medium">{{ category.name }}</div>
                      <div v-if="category.description" class="text-xs text-muted-foreground">
                        {{ category.description }}
                      </div>
                    </div>
                    <span 
                      class="w-3 h-3 rounded-full flex-shrink-0" 
                      :style="{ backgroundColor: category.color }"
                    />
                  </div>
                </Button>
              </div>
              
              <!-- Catégories de revenus -->
              <div v-if="showIncomeCategories" class="mt-2">
                <div class="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Revenus
                </div>
                <Button
                  v-for="category in incomeCategories"
                  :key="category.id"
                  variant="ghost"
                  class="w-full justify-start h-auto p-2 mb-1"
                  @click="selectCategory(category)"
                >
                  <div class="flex items-center gap-3 w-full">
                    <span class="text-lg flex-shrink-0">{{ category.icon }}</span>
                    <div class="flex-1 text-left">
                      <div class="font-medium">{{ category.name }}</div>
                      <div v-if="category.description" class="text-xs text-muted-foreground">
                        {{ category.description }}
                      </div>
                    </div>
                    <span 
                      class="w-3 h-3 rounded-full flex-shrink-0" 
                      :style="{ backgroundColor: category.color }"
                    />
                  </div>
                </Button>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="border-t p-2" :class="isDarkMode ? 'border-gray-700' : 'border-gray-200'">
            <Button
              v-if="allowClear && selectedCategory"
              variant="ghost"
              size="sm"
              class="w-full text-red-500 hover:text-red-600"
              @click="clearSelection"
            >
              <X class="h-4 w-4 mr-2" />
              Aucune catégorie
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
    
    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { ChevronDown, Search, X } from 'lucide-vue-next';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { useCategoriesStore } from '~/stores/categories';
  import { useSettingsStore } from '~/stores/settings';
  import { storeToRefs } from 'pinia';
  import type { Category } from '~/types/categories';

  interface Props {
    modelValue?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    allowClear?: boolean;
    filterType?: 'all' | 'expense' | 'income';
    errorMessage?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Sélectionner une catégorie',
    allowClear: true,
    filterType: 'all'
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string | undefined];
    'change': [category: Category | undefined];
  }>();

  const categoriesStore = useCategoriesStore();
  const settingsStore = useSettingsStore();
  const { isDarkMode } = storeToRefs(settingsStore);

  const searchQuery = ref('');

  // Classes pour le label
  const labelClasses = computed(() => [
    'text-sm font-medium',
    isDarkMode.value ? 'text-white' : 'text-gray-900'
  ]);

  // Catégorie sélectionnée
  const selectedCategory = computed(() => {
    if (!props.modelValue) return null;
    return categoriesStore.getCategoryById(props.modelValue);
  });

  // Categories filtrées par recherche
  const filteredCategories = computed(() => {
    let categories = categoriesStore.sortedCategories;
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      categories = categories.filter(cat => 
        cat.name.toLowerCase().includes(query) ||
        cat.description?.toLowerCase().includes(query)
      );
    }
    
    return categories;
  });

  // Catégories de dépenses filtrées
  const expenseCategories = computed(() => {
    if (props.filterType === 'income') return [];
    return filteredCategories.value.filter(cat => cat.order < 10);
  });

  // Catégories de revenus filtrées
  const incomeCategories = computed(() => {
    if (props.filterType === 'expense') return [];
    return filteredCategories.value.filter(cat => cat.order >= 10 && cat.order < 90);
  });

  // Affichage conditionnel des sections
  const showExpenseCategories = computed(() => {
    return expenseCategories.value.length > 0;
  });

  const showIncomeCategories = computed(() => {
    return incomeCategories.value.length > 0;
  });

  // Sélectionner une catégorie
  const selectCategory = (category: Category) => {
    emit('update:modelValue', category.id);
    emit('change', category);
    searchQuery.value = '';
  };

  // Effacer la sélection
  const clearSelection = () => {
    emit('update:modelValue', undefined);
    emit('change', undefined);
    searchQuery.value = '';
  };
</script>