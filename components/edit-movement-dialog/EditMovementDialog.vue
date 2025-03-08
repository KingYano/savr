<template>
  <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
    <DialogContent :class="[
      'p-0 w-full sm:max-w-[500px] max-h-[90vh] overflow-y-auto',
      isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-slate-200'
    ]">
      <DialogHeader :class="[
        'sticky top-0 z-10 p-4 sm:p-6 border-b',
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-slate-200 bg-white'
      ]">
        <DialogTitle :class="[
          'text-xl sm:text-2xl font-semibold',
          isDarkMode ? 'text-white' : 'text-slate-900'
        ]">
          Modifier un mouvement
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
                editedMovement.type === 'expense'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'border bg-slate-100',

              ]"
                @click="editedMovement.type = 'expense'"
            >
              Dépense
            </button>
            <button
                type="button"
                :class="[
                'w-full px-3 py-2 rounded-md text-sm sm:text-base',
                editedMovement.type === 'income'
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'border bg-slate-100'
              ]"
                @click="editedMovement.type = 'income'"
            >
              Revenu
            </button>
          </div>
        </div>

        <div class="space-y-3 sm:space-y-4">
          <div class="space-y-1 sm:space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Nom</label>
            <Input
                v-model="editedMovement.name"
                type="text"
                placeholder="Ex: Loyer, Salaire..."
                :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200'
              ]"
            />
          </div>

          <div class="space-y-1 sm:space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Montant</label>
            <div class="relative">
              <Input
                  v-model="editedMovement.amount"
                  type="number"
                  placeholder="0.00"
                  class="pl-8"
                  :class="[
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200'
                ]"
              />
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
            </div>
          </div>

          <div class="space-y-1 sm:space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Date</label>
            <Input
                v-model="dateString"
                type="date"
                :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200'
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
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                ]"
              >
                <span>Choisir une image</span>
              </button>
              <span class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">
                {{ imageFileName || 'Aucun fichier sélectionné' }}
              </span>
            </div>

            <div v-if="previewUrl" class="mt-2 relative">
              <img :src="previewUrl" alt="Prévisualisation" class="h-24 w-auto object-cover rounded-md" />
              <button
                  type="button"
                  @click="removeImage"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full "
              >
                <span class="items-center justify-center"><CircleX/></span>
              </button>
            </div>

            <div v-else-if="editedMovement.imageUrl && editedMovement.imageUrl.length > 0" class="mt-2 relative">
              <img :src="editedMovement.imageUrl" alt="Image actuelle" class="h-24 w-auto object-cover rounded-md" />
              <button
                  type="button"
                  @click="removeCurrentImage"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full "
              >
                <span class="items-center justify-center"><CircleX/></span>
              </button>
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
                !editedMovement.isRecurrent
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : ''
              ]"
                @click="editedMovement.isRecurrent = false"
            >
              <span class="mr-2">🔄</span> Pas de récurrence
            </Button>
            <Button
                variant="outline"
                :class="[
                'justify-start py-1 sm:py-2 text-sm sm:text-base',
                editedMovement.isRecurrent
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : ''
              ]"
                @click="editedMovement.isRecurrent = true"
            >
              <span class="mr-2">📅</span> Mensuel
            </Button>
          </div>
        </div>
      </div>

      <DialogFooter :class="[
        'sticky bottom-0 z-10 p-4 sm:p-6 border-t flex space-x-2',
        isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-slate-200 bg-white'
      ]">
        <Button
            class="w-1/2 bg-red-500 hover:bg-red-600 text-white"
            @click="handleDeleteMovement"
        >
          Supprimer
        </Button>
        <Button
            class="w-1/2 bg-emerald-500 hover:bg-emerald-600 text-white"
            @click="handleSaveMovement"
        >
          Enregistrer
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
  import type { Movement } from '@/types/finance';
  import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { CircleX } from 'lucide-vue-next'

  interface EditMovementDialogProps {
    isOpen: boolean;
    isDarkMode: boolean;
    movement: Movement | null;
  }

  const props = defineProps<EditMovementDialogProps>();
  const emit = defineEmits(['update:isOpen', 'saveMovement', 'deleteMovement']);

  const fileInput = ref<HTMLInputElement | null>(null);
  const previewUrl = ref<string>('');
  const imageFileName = ref<string>('');
  const imageFile = ref<File | null>(null);
  const dateString = ref('');
  const editedMovement = ref<Movement>({
    id: 0,
    name: '',
    amount: 0,
    date: new Date(),
    type: 'expense',
    isRecurrent: false,
    imageUrl: '',
  });

  watch(() => props.movement, (newMovement) => {
    if (newMovement) {
      editedMovement.value = { ...newMovement };

      const date = new Date(newMovement.date);
      if (!isNaN(date.getTime())) {
        dateString.value = date.toISOString().split('T')[0];
      }

      previewUrl.value = '';
      imageFileName.value = '';
      imageFile.value = null;
    }
  }, { immediate: true });

  watch(dateString, (newValue) => {
    if (newValue) {
      editedMovement.value.date = new Date(newValue);
    }
  });

  const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      imageFile.value = file;
      imageFileName.value = file.name;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          previewUrl.value = e.target.result as string;
          editedMovement.value.imageUrl = '';
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    previewUrl.value = '';
    imageFileName.value = '';
    imageFile.value = null;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  };

  const removeCurrentImage = () => {
    editedMovement.value.imageUrl = '';
  };

  const handleSaveMovement = () => {
    if (!editedMovement.value.name || !editedMovement.value.amount || !editedMovement.value.date) {
      return;
    }

    const updatedMovement = { ...editedMovement.value };

    if (previewUrl.value && previewUrl.value.length > 0) {
      updatedMovement.imageUrl = previewUrl.value;

      if (updatedMovement.imageUrl.startsWith('blob:')) {
        console.error('URL Blob détectée, conversion en base64 nécessaire');
      }
    }

    emit('saveMovement', updatedMovement);

    removeImage();
  };

  const handleDeleteMovement = () => {
    if (props.movement) {
      emit('deleteMovement', props.movement.id);
    }
  };
</script>