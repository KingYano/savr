<!-- components/AddMovementDialog.vue -->
<template>
  <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
    <DialogContent :class="[
      'p-0 w-full max-w-[500px]',
      isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-slate-200'
    ]">
      <!-- Header -->
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

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Type de mouvement -->
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

        <!-- Informations de base -->
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
                v-model="newMovement.date"
                type="date"
                :class="[
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200'
              ]"
            />
          </div>
        </div>

        <!-- Type de récurrence -->
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
                newMovement.recurrenceType === 'none'
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : ''
              ]"
                @click="newMovement.recurrenceType = 'none'"
            >
              <span class="mr-2">🔄</span> Pas de récurrence
            </Button>
            <Button
                variant="outline"
                :class="[
                'justify-start',
                newMovement.recurrenceType === 'monthly'
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : ''
              ]"
                @click="newMovement.recurrenceType = 'monthly'"
            >
              <span class="mr-2">📅</span> Mensuel
            </Button>
            <Button
                variant="outline"
                :class="[
                'justify-start',
                newMovement.recurrenceType === 'split'
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : ''
              ]"
                @click="newMovement.recurrenceType = 'split'"
            >
              <span class="mr-2">📎</span> Paiement échelonné
            </Button>
          </div>
        </div>

        <!-- Options de paiement échelonné -->
        <div v-if="newMovement.recurrenceType === 'split'" class="space-y-2">
          <label :class="isDarkMode ? 'text-white' : 'text-slate-900'">Nombre de mois</label>
          <div class="relative w-full">
            <select
                v-model="newMovement.splitMonths"
                :class="[
                'w-full h-10 px-3 rounded-md border',
                isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200'
              ]"
            >
              <option value="2">2 mois</option>
              <option value="3">3 mois</option>
              <option value="4">4 mois</option>
              <option value="6">6 mois</option>
              <option value="12">12 mois</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Footer -->
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
import { ref } from 'vue';
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

const newMovement = ref<NewMovement>({
  name: '',
  amount: '',
  date: '',
  type: 'expense',
  recurrenceType: 'none',
  splitMonths: 2,
});

const handleAddMovement = () => {
  if (!newMovement.value.name || !newMovement.value.amount || !newMovement.value.date) {
    return;
  }

  emit('addMovement', { ...newMovement.value });

  // Reset form
  newMovement.value = {
    name: '',
    amount: '',
    date: '',
    type: 'expense',
    recurrenceType: 'none',
    splitMonths: 2,
  };
};
</script>