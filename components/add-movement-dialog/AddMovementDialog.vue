<template>
  <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
    <DialogContent :class="[
      'p-0 w-full max-w-[500px]',
      isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-slate-200'
    ]">
      <DialogHeader :class="[
        'p-6 border-b',
        isDarkMode ? 'border-gray-800' : 'border-slate-200'
      ]">
        <DialogTitle :class="[
          'text-2xl font-semibold',
          isDarkMode ? 'text-white' : 'text-slate-900'
        ]">
          Ajouter un mouvement
        </DialogTitle>
      </DialogHeader>

      <div class="p-6 space-y-6">
        <div class="space-y-3">
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
                'w-full px-4 py-2 rounded-md',
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
                'w-full px-4 py-2 rounded-md',
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

        <div class="space-y-4">
          <div class="space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Nom</label>
            <Input
                v-model="newMovement.name"
                type="text"
                placeholder="Ex: Loyer, Salaire..."
                :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200'
              ]"
            />
          </div>

          <div class="space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Montant</label>
            <div class="relative">
              <Input
                  v-model="newMovement.amount"
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

          <div class="space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Date</label>
            <Input
                v-model="dateString"
                type="date"
                :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200'
              ]"
            />
          </div>

          <div class="space-y-2">
            <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Image (optionnel)</label>
            <div class="flex items-center gap-2">
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
                  'px-4 py-2 rounded-md flex items-center gap-2',
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
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <span class="sr-only">Supprimer</span>
                <span class="block h-4 w-4 flex items-center justify-center">×</span>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-3">
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
                'justify-start',
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
                'justify-start',
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
        'p-6 border-t',
        isDarkMode ? 'border-gray-800' : 'border-slate-200'
      ]">
        <Button
            class="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            @click="handleAddMovement"
        >
          Ajouter
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
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

const props = defineProps<AddMovementDialogProps>();
const emit = defineEmits(['update:isOpen', 'addMovement']);

const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string>('');
const imageFileName = ref<string>('');
const imageFile = ref<File | null>(null);
const dateString = ref('');

const newMovement = ref<NewMovement>({
  name: '',
  amount: 0,
  date: '',
  type: 'expense',
  isRecurrent: false,
  imageUrl: '',
});

watch(dateString, (newValue) => {
  newMovement.value.date = newValue;
});

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    imageFile.value = file;
    imageFileName.value = file.name;

    // Convertir l'image en base64
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        previewUrl.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  previewUrl.value = '';
  imageFileName.value = '';
  imageFile.value = null;
  newMovement.value.imageUrl = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const handleAddMovement = () => {
  if (!newMovement.value.name || !newMovement.value.amount || !newMovement.value.date) {
    return;
  }

  // Ajouter l'URL de l'image si disponible (déjà en base64)
  if (previewUrl.value && previewUrl.value.length > 0) {
    newMovement.value.imageUrl = previewUrl.value;

    // Vérifier que ce n'est pas une URL Blob
    if (newMovement.value.imageUrl.startsWith('blob:')) {
      console.error('URL Blob détectée, conversion en base64 nécessaire');
    }
  }

  emit('addMovement', { ...newMovement.value });

  // Reset form
  newMovement.value = {
    name: '',
    amount: 0,
    date: '',
    type: 'expense',
    isRecurrent: false,
    imageUrl: '',
  };
  dateString.value = '';

  // Réinitialiser l'image
  removeImage();
};
</script>