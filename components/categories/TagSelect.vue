<template>
  <div class="space-y-2">
    <label v-if="label" :class="labelClasses">
      {{ label }}
    </label>
    
    <div class="space-y-2">
      <!-- Tags sélectionnés -->
      <div v-if="selectedTags.length > 0" class="flex flex-wrap gap-1">
        <span
          v-for="tag in selectedTags"
          :key="tag.id"
          class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium cursor-pointer"
          :style="{ 
            backgroundColor: `${tag.color}20`, 
            color: tag.color,
            border: `1px solid ${tag.color}40`
          }"
          @click="removeTag(tag.id)"
        >
          {{ tag.name }}
          <X class="h-3 w-3 hover:bg-red-500 hover:text-white rounded-full" />
        </span>
      </div>
      
      <!-- Input pour nouveaux tags -->
      <Popover v-model:open="isOpen">
        <PopoverTrigger as-child>
          <Button 
            variant="outline" 
            class="w-full justify-between h-auto min-h-[2.5rem] p-2"
            :class="isDarkMode ? 'border-white/10 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'"
          >
            <div class="flex items-center gap-2">
              <Tag class="h-4 w-4 opacity-50" />
              <span class="text-sm text-muted-foreground">
                {{ selectedTags.length > 0 ? `${selectedTags.length} tag(s) sélectionné(s)` : placeholder }}
              </span>
            </div>
            <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent class="w-80 p-0" align="start">
          <div :class="isDarkMode ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-gray-200'">
            <!-- Recherche/Création -->
            <div class="p-2 border-b" :class="isDarkMode ? 'border-white/10' : 'border-gray-200'">
              <div class="relative">
                <Search class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  v-model="searchQuery"
                  placeholder="Rechercher ou créer un tag..."
                  class="pl-8"
                  :class="isDarkMode ? 'bg-gray-800 border-white/10' : 'bg-white border-gray-300'"
                  @keydown.enter.prevent="handleEnter"
                />
              </div>
              
              <!-- Bouton pour créer un nouveau tag -->
              <Button
                v-if="searchQuery && !exactMatch && allowCreate"
                variant="ghost"
                size="sm"
                class="w-full mt-2 justify-start text-green-600 hover:text-green-700"
                @click="createNewTag"
              >
                <Plus class="h-4 w-4 mr-2" />
                Créer "{{ searchQuery }}"
              </Button>
            </div>
            
            <!-- Liste des tags -->
            <div class="max-h-48 overflow-auto">
              <div v-if="filteredTags.length === 0 && !searchQuery" class="p-4 text-center text-muted-foreground text-sm">
                Aucun tag disponible
              </div>
              
              <div v-else-if="filteredTags.length === 0 && searchQuery && !allowCreate" class="p-4 text-center text-muted-foreground text-sm">
                Aucun tag trouvé
              </div>
              
              <div v-else class="p-1">
                <Button
                  v-for="tag in filteredTags"
                  :key="tag.id"
                  variant="ghost"
                  size="sm"
                  class="w-full justify-start mb-1"
                  :class="isSelected(tag.id) ? 'bg-accent' : ''"
                  @click="toggleTag(tag)"
                >
                  <span
                    class="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                    :style="{ backgroundColor: tag.color }"
                  />
                  {{ tag.name }}
                  <Check v-if="isSelected(tag.id)" class="ml-auto h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
    
    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="text-sm text-red-500 mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { ChevronDown, Search, X, Plus, Check, Tag } from 'lucide-vue-next';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { useCategoriesStore } from '~/stores/categories';
  import { useSettingsStore } from '~/stores/settings';
  import { storeToRefs } from 'pinia';
  import type { Tag as TagType } from '~/types/categories';

  interface Props {
    modelValue?: string[];
    label?: string;
    placeholder?: string;
    allowCreate?: boolean;
    maxTags?: number;
    errorMessage?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    placeholder: 'Sélectionner des tags',
    allowCreate: true,
    maxTags: 5
  });

  const emit = defineEmits<{
    'update:modelValue': [value: string[]];
    'change': [tags: TagType[]];
  }>();

  const categoriesStore = useCategoriesStore();
  const settingsStore = useSettingsStore();
  const { isDarkMode } = storeToRefs(settingsStore);

  const searchQuery = ref('');
  const isOpen = ref(false);

  // Couleurs disponibles pour les nouveaux tags
  const tagColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];

  // Classes pour le label
  const labelClasses = computed(() => [
    'text-sm font-medium',
    isDarkMode.value ? 'text-white' : 'text-gray-900'
  ]);

  // Tags sélectionnés
  const selectedTags = computed(() => {
    return props.modelValue
      .map(id => categoriesStore.getTagById(id))
      .filter(Boolean) as TagType[];
  });

  // Tags filtrés par recherche
  const filteredTags = computed(() => {
    let tags = categoriesStore.tags;
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      tags = tags.filter(tag => 
        tag.name.toLowerCase().includes(query)
      );
    }
    
    return tags;
  });

  // Vérifier si un tag existe exactement
  const exactMatch = computed(() => {
    if (!searchQuery.value) return false;
    return categoriesStore.tags.some(tag => 
      tag.name.toLowerCase() === searchQuery.value.toLowerCase()
    );
  });

  // Vérifier si un tag est sélectionné
  const isSelected = (tagId: string) => {
    return props.modelValue.includes(tagId);
  };

  // Basculer la sélection d'un tag
  const toggleTag = (tag: TagType) => {
    const newValues = isSelected(tag.id)
      ? props.modelValue.filter(id => id !== tag.id)
      : [...props.modelValue, tag.id];

    // Vérifier la limite
    if (newValues.length > props.maxTags) {
      return;
    }

    emit('update:modelValue', newValues);
    emit('change', newValues.map(id => categoriesStore.getTagById(id)).filter(Boolean) as TagType[]);
  };

  // Supprimer un tag
  const removeTag = (tagId: string) => {
    const newValues = props.modelValue.filter(id => id !== tagId);
    emit('update:modelValue', newValues);
    emit('change', newValues.map(id => categoriesStore.getTagById(id)).filter(Boolean) as TagType[]);
  };

  // Créer un nouveau tag
  const createNewTag = async () => {
    if (!searchQuery.value.trim()) return;
    
    try {
      // Choisir une couleur aléatoire
      const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
      
      const newTag = categoriesStore.addTag({
        name: searchQuery.value.trim(),
        color: randomColor
      });

      // Ajouter le nouveau tag à la sélection
      const newValues = [...props.modelValue, newTag.id];
      emit('update:modelValue', newValues);
      emit('change', newValues.map(id => categoriesStore.getTagById(id)).filter(Boolean) as TagType[]);

      // Réinitialiser la recherche
      searchQuery.value = '';
    } catch (error) {
      console.error('Erreur création tag:', error);
    }
  };

  // Gérer la touche Entrée
  const handleEnter = () => {
    if (searchQuery.value && !exactMatch.value && props.allowCreate) {
      createNewTag();
    }
  };
</script>