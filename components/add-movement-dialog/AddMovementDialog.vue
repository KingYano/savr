<template>
  <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
    <DialogContent :class="[
      'p-0 w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto',
      isDarkMode ? 'bg-[#1A1A1A] border-white/10' : 'bg-white border-slate-200'
    ]">
      <DialogHeader :class="[
        'sticky top-0 z-10 p-4 sm:p-6 border-b',
        isDarkMode ? 'border-white/10 bg-[#1A1A1A]' : 'border-slate-200 bg-white'
      ]">
        <DialogTitle :class="[
          'text-xl sm:text-2xl font-semibold',
          isDarkMode ? 'text-white' : 'text-slate-900'
        ]">
          Ajouter un mouvement
        </DialogTitle>
      </DialogHeader>

      <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div class="space-y-2 sm:space-y-3">
          <label :class="[
            'text-sm font-medium',
            isDarkMode ? 'text-white' : 'text-slate-900'
          ]">
            Type de mouvement
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
                type="button"
                :class="[
                'w-full px-3 py-2 rounded-md text-sm sm:text-base',
                newMovement.type === 'expense'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'border bg-slate-100',

              ]"
                @click="newMovement.type = 'expense'"
            >
              Dépense
            </button>
            <button
                type="button"
                :class="[
                'w-full px-3 py-2 rounded-md text-sm sm:text-base',
                newMovement.type === 'income'
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'border bg-slate-100'
              ]"
                @click="newMovement.type = 'income'"
            >
              Revenu
            </button>
          </div>
        </div>

        <div class="space-y-3 sm:space-y-4">
          <div class="space-y-1 sm:space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Nom</label>
            <Input
                v-model="newMovement.name"
                type="text"
                placeholder="Ex: Loyer, Salaire..."
                :class="[
                isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-slate-200'
              ]"
            />
          </div>

          <div class="space-y-1 sm:space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Montant</label>
            <div class="relative">
              <Input
                  v-model="newMovement.amount"
                  type="number"
                  placeholder="0.00"
                  class="pl-8"
                  :class="[
                  isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-slate-200'
                ]"
              />
              <span :class="['absolute left-3 top-1/2 -translate-y-1/2', isDarkMode ? 'text-gray-400' : 'text-gray-500']">€</span>
            </div>
          </div>

          <div class="space-y-1 sm:space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Date</label>
            <Input
                v-model="dateString"
                type="date"
                :class="[
                isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-slate-200'
              ]"
            />
          </div>

          <!-- Catégorie -->
          <div class="space-y-1 sm:space-y-2">
            <CategorySelect
              v-model="newMovement.categoryId"
              label="Catégorie"
              :filter-type="newMovement.type"
            />
          </div>

          <!-- Tags -->
          <div class="space-y-1 sm:space-y-2">
            <TagSelect
              v-model="newMovement.tags"
              label="Tags (optionnel)"
              :max-tags="3"
            />
          </div>

          <!-- Description -->
          <div class="space-y-1 sm:space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Description (optionnel)</label>
            <Input
                v-model="newMovement.description"
                type="text"
                placeholder="Description du mouvement..."
                :class="[
                isDarkMode ? 'bg-[#242424] border-white/10 text-white' : 'bg-white border-slate-200'
              ]"
            />
          </div>

          <div class="space-y-1 sm:space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Image (optionnel)</label>
            <div class="flex flex-wrap items-center gap-2">
              <input
                  type="file"
                  id="image"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                  ref="fileInput"
              />
              <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  :class="[
                  'px-3 py-2 rounded-md flex items-center gap-1 text-sm sm:text-base',
                  isDarkMode ? 'bg-[#242424] hover:bg-[#3D3D3D] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
              >
                <span>Choisir une image</span>
              </button>
              <span class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                {{ imageUpload.state.value.fileName || 'Aucun fichier sélectionné' }}
              </span>
            </div>

            <div v-if="imageUpload.state.value.previewUrl" class="mt-2 relative">
              <img :src="imageUpload.state.value.previewUrl" alt="Prévisualisation" class="h-24 w-auto object-cover rounded-md" />
              <button
                  type="button"
                  @click="removeImage"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full "
              >
                <span class="items-center justify-center"><CircleX/></span>
              </button>
            </div>
            
            <!-- Affichage des erreurs et informations de compression -->
            <div v-if="imageUpload.state.value.error" class="mt-2">
              <Alert variant="destructive">
                <AlertDescription>
                  {{ imageUpload.state.value.error }}
                </AlertDescription>
              </Alert>
            </div>
            
            <div v-if="imageUpload.state.value.compressionInfo" class="mt-1">
              <div class="text-xs flex items-center gap-1" :class="isDarkMode ? 'text-green-400' : 'text-green-600'">
                <Check class="h-3 w-3" />
                {{ imageUpload.state.value.compressionInfo }}
              </div>
            </div>
            
            <div v-if="imageUpload.state.value.isUploading" class="mt-2">
              <div class="flex items-center gap-2 text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'">
                <Upload class="h-4 w-4 animate-pulse" />
                Traitement en cours...
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-2 sm:space-y-3">
          <label :class="[
            'text-sm font-medium',
            isDarkMode ? 'text-white' : 'text-slate-900'
          ]">
            Type de récurrence
          </label>
          <div class="grid grid-cols-1 gap-2">
            <Button
                variant="outline"
                :class="[
                'justify-start py-1 sm:py-2 text-sm sm:text-base',
                !newMovement.isRecurrent
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : ''
              ]"
                @click="newMovement.isRecurrent = false"
            >
              <span class="mr-2">🔄</span> Pas de récurrence
            </Button>
            <Button
                variant="outline"
                :class="[
                'justify-start py-1 sm:py-2 text-sm sm:text-base',
                newMovement.isRecurrent
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : ''
              ]"
                @click="newMovement.isRecurrent = true"
            >
              <span class="mr-2">📅</span> Mensuel
            </Button>
          </div>
        </div>
      </div>

      <DialogFooter :class="[
        'sticky bottom-0 z-10 p-4 sm:p-6 border-t',
        isDarkMode ? 'border-white/10 bg-[#1A1A1A]' : 'border-slate-200 bg-white'
      ]">
        <Button
            class="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            @click="handleAddMovement"
            :disabled="imageUpload.state.value.isUploading"
        >
          {{ imageUpload.state.value.isUploading ? 'Traitement...' : 'Ajouter' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import type { AddMovementDialogProps, NewMovement } from '@/types/finance';
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Alert, AlertDescription } from '@/components/ui/alert';
  import { CircleX, Upload, Check } from 'lucide-vue-next';
  import { useImageUpload } from '~/composables/useImageUpload';
  import CategorySelect from '~/components/categories/CategorySelect.vue';
  import TagSelect from '~/components/categories/TagSelect.vue';


  const props = defineProps<AddMovementDialogProps>();
  const emit = defineEmits(['update:isOpen', 'addMovement']);

  const fileInput = ref<HTMLInputElement | null>(null);
  const dateString = ref('');
  
  // Utilisation du composable pour l'upload d'images
  const imageUpload = useImageUpload({
    maxSizeBytes: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    compressionEnabled: true
  });

  const newMovement = ref<NewMovement>({
    name: '',
    amount: 0,
    date: '',
    type: 'expense',
    isRecurrent: false,
    imageUrl: '',
    categoryId: undefined,
    tags: [],
    description: ''
  });

  watch(dateString, (newValue) => {
    newMovement.value.date = newValue;
  });

  const handleImageUpload = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      await imageUpload.handleFileUpload(file);
    }
  };

  const removeImage = () => {
    imageUpload.resetState();
    newMovement.value.imageUrl = '';
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  };

  const handleAddMovement = async () => {
    if (!newMovement.value.name || !newMovement.value.amount || !newMovement.value.date) {
      return;
    }

    try {
      // Obtenir l'URL de données si une image est présente
      if (imageUpload.state.value.file) {
        newMovement.value.imageUrl = await imageUpload.getDataUrl();
      }

      emit('addMovement', { ...newMovement.value });

      // Reset du formulaire
      newMovement.value = {
        name: '',
        amount: 0,
        date: '',
        type: 'expense',
        isRecurrent: false,
        imageUrl: '',
        categoryId: undefined,
        tags: [],
        description: ''
      };
      dateString.value = '';
      removeImage();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du mouvement:', error);
    }
  };
</script>