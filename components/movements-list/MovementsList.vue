<template>
  <div :class="[
    'rounded-xl overflow-hidden',
    isDarkMode ? 'bg-gray-900' : 'bg-white',
    isDarkMode ? 'border-gray-800' : 'border border-gray-200'
  ]">
    <div class="p-4">
      <h2 :class="[
        'text-xl font-semibold',
        isDarkMode ? 'text-white' : 'text-gray-900'
      ]">
        Mouvements
      </h2>
    </div>

    <div class="divide-y" :class="isDarkMode ? 'divide-gray-800' : 'divide-gray-100'">
      <div v-for="movement in filteredMovements" :key="movement.id" class="p-4 flex items-center gap-3">
        <div
            :class="[
            'w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center',
            movement.amount > 0 ? 'bg-green-100' : 'bg-red-100',
            isDarkMode && movement.amount > 0 ? 'bg-green-800' : '',
            isDarkMode && movement.amount < 0 ? 'bg-red-800' : ''
          ]"
        >
          <img
              v-if="movement.imageUrl && movement.imageUrl.length > 0"
              :src="movement.imageUrl"
              alt=""
              class="w-full h-full object-cover rounded-full cursor-pointer"
              @click="openImagePreview(movement.imageUrl)"
          />
          <ArrowDownCircle v-else-if="movement.type === 'expense'" class="w-6 h-6" :class="isDarkMode ? 'text-red-200' : 'text-red-500'" />
          <ArrowUpCircle v-else class="w-6 h-6" :class="isDarkMode ? 'text-green-200' : 'text-green-500'" />
        </div>

        <div class="flex-1">
          <div :class="isDarkMode ? 'text-white' : 'text-gray-900'">{{ movement.name }}</div>
          <div class="text-sm" :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">
            {{ formatDate(movement.date) }} • {{ movement.type === 'expense' ? 'Dépense' : 'Revenu' }}
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
      </div>

      <div v-if="filteredMovements.length === 0" class="p-6 text-center">
        <div :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'">
          Aucun mouvement pour cette date
        </div>
      </div>
    </div>

    <Dialog :open="!!previewImageUrl && previewImageUrl.length > 0" @update:open="previewImageUrl = ''">
      <DialogContent :class="isDarkMode ? 'dark bg-gray-900' : 'bg-white'" class="max-w-2xl">
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
  </div>
</template>

<script setup lang="ts">
  import { ArrowUpCircle, ArrowDownCircle } from 'lucide-vue-next';
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import type { Movement } from '~/types/finance';
  import { formatCurrency, formatDate } from '~/utils/formatters';

  const props = defineProps<{
    movements: Movement[];
    selectedDate: Date;
    isDarkMode: boolean;
  }>();

  const previewImageUrl = ref<string>('');

  const filteredMovements = computed(() => {
    return props.movements.filter(movement => {
      const movementDate = new Date(movement.date);
      return movementDate.getDate() === props.selectedDate.getDate() &&
          movementDate.getMonth() === props.selectedDate.getMonth() &&
          movementDate.getFullYear() === props.selectedDate.getFullYear();
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  const openImagePreview = (url: string) => {
    if (url && url.length > 0 && !url.startsWith('blob:')) {
      previewImageUrl.value = url;
    } else {
      console.error('URL d\'image invalide:', url);
    }
  };
</script>