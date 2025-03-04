<template>
  <div :class="[
   'rounded-xl overflow-hidden',
   isDarkMode ? 'bg-gray-900' : 'bg-white',
   isDarkMode ? 'border-gray-800' : 'border border-gray-200'
 ]">
    <div class="p-4 flex justify-between items-center">
      <h2 :class="[
       'text-xl font-semibold',
       isDarkMode ? 'text-white' : 'text-gray-900'
     ]">
        Calendrier
      </h2>

      <div class="flex items-center gap-2">
        <button
            @click="prevMonth"
            :class="[
           'p-1 rounded-md',
           isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
         ]"
        >
          <ChevronLeft class="h-5 w-5" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'" />
        </button>

        <span :class="isDarkMode ? 'text-white' : 'text-gray-900'">
         {{ formatMonth(internalCurrentMonth) }}
       </span>

        <button
            @click="nextMonth"
            :class="[
           'p-1 rounded-md',
           isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
         ]"
        >
          <ChevronRight class="h-5 w-5" :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-px" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-200'">
      <div
          v-for="day in daysOfWeek"
          :key="day"
          class="p-2 text-center text-sm font-medium"
          :class="isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'"
      >
        {{ day }}
      </div>

      <div
          v-for="(day, index) in calendarDays"
          :key="index"
          @click="selectDate(day)"
          :class="[
         'p-2',
         'md:min-h-[100px]',
         'min-h-[80px]',
         isDarkMode ? 'bg-gray-900' : 'bg-white',
         isDarkMode && !day.isCurrentMonth ? 'text-gray-700' : '',
         !isDarkMode && !day.isCurrentMonth ? 'text-gray-300' : '',
         isDarkMode && day.isCurrentMonth ? 'text-gray-300' : '',
         !isDarkMode && day.isCurrentMonth ? 'text-gray-600' : '',
         isDarkMode && isSelectedDate(day.date) ? 'bg-gray-800 border border-green-500' : '',
         !isDarkMode && isSelectedDate(day.date) ? 'bg-green-50 border border-green-500' : '',
         isDarkMode && isToday(day.date) ? 'font-bold text-white' : '',
         !isDarkMode && isToday(day.date) ? 'font-bold text-black' : '',
         'hover:cursor-pointer'
       ]"
      >
        <div class="flex flex-col h-full">
          <div class="text-right">
            {{ day.date.getDate() }}
          </div>

          <div class="flex-1 mt-1">
            <div class="hidden md:flex flex-wrap gap-1">
              <template v-for="(movement) in getDayMovements(day.date).slice(0, 4)" :key="`desktop-${movement.id}`">
                <div class="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 border" :class="[movement.type === 'income' ? 'border-green-600' : 'border-red-600']">
                  <img v-if="movement.imageUrl && movement.imageUrl.length > 0"
                       :src="movement.imageUrl"
                       alt=""
                       class="w-full h-full object-cover cursor-pointer"
                       @click.stop="openImagePreview(movement.imageUrl)" />
                  <div v-else :class="[
                   'w-full h-full flex items-center justify-center text-white text-xs',
                   movement.type === 'income' ? 'bg-green-600' : 'bg-red-600'
                 ]">
                    {{ movement.type === 'income' ? '↑' : '↓' }}
                  </div>
                </div>
              </template>

              <div v-if="getDayMovements(day.date).length > 4"
                   class="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                +{{ getDayMovements(day.date).length - 4 }}
              </div>
            </div>

            <div class="flex md:hidden flex-wrap gap-1">
              <template v-for="(movement) in getDayMovements(day.date).slice(0, 2)" :key="`mobile-${movement.id}`">
                <div class="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                  <img v-if="movement.imageUrl && movement.imageUrl.length > 0"
                       :src="movement.imageUrl"
                       alt=""
                       class="w-full h-full object-cover cursor-pointer"
                       @click.stop="openImagePreview(movement.imageUrl)" />
                  <div v-else :class="[
                   'w-full h-full flex items-center justify-center text-white text-[8px]',
                   movement.type === 'income' ? 'bg-green-600' : 'bg-red-600'
                 ]">
                    {{ movement.type === 'income' ? '↑' : '↓' }}
                  </div>
                </div>
              </template>

              <div v-if="getDayMovements(day.date).length > 2"
                   class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-[8px]">
                +{{ getDayMovements(day.date).length - 2 }}
              </div>
            </div>
          </div>
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

<script setup>
  import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';

  const props = defineProps({
    movements: Array,
    selectedDate: Date,
    currentMonth: Date,
    isDarkMode: Boolean
  });

  const emit = defineEmits(['update:selected-date', 'update:current-month']);

  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const internalCurrentMonth = ref(new Date(props.currentMonth));
  const previewImageUrl = ref('');

  watch(() => props.currentMonth, (newValue) => {
    internalCurrentMonth.value = new Date(newValue);
  });

  const calendarDays = computed(() => {
    const year = internalCurrentMonth.value.getFullYear();
    const month = internalCurrentMonth.value.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);

    let firstDayOfWeek = firstDayOfMonth.getDay();
    if (firstDayOfWeek === 0) firstDayOfWeek = 7;

    const daysFromPrevMonth = firstDayOfWeek - 1;

    const startDate = new Date(year, month, 1 - daysFromPrevMonth);

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push({
        date,
        isCurrentMonth: date.getMonth() === month
      });
    }

    if (days[35].date.getMonth() !== month && days[34].date.getMonth() !== month) {
      return days.slice(0, 35);
    }

    return days;
  });

  const formatMonth = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {month: 'long', year: 'numeric'}).format(date);
  };

  const prevMonth = () => {
    const newDate = new Date(internalCurrentMonth.value);
    newDate.setMonth(newDate.getMonth() - 1);
    internalCurrentMonth.value = newDate;
    emit('update:current-month', newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(internalCurrentMonth.value);
    newDate.setMonth(newDate.getMonth() + 1);
    internalCurrentMonth.value = newDate;
    emit('update:current-month', newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
  };

  const isSelectedDate = (date) => {
    return date.getDate() === props.selectedDate.getDate() &&
        date.getMonth() === props.selectedDate.getMonth() &&
        date.getFullYear() === props.selectedDate.getFullYear();
  };

  const selectDate = (day) => {
    emit('update:selected-date', new Date(day.date));
  };

  const getDayMovements = (date) => {
    return props.movements.filter(movement => {
      const movementDate = new Date(movement.date);
      return movementDate.getDate() === date.getDate() &&
          movementDate.getMonth() === date.getMonth() &&
          movementDate.getFullYear() === date.getFullYear();
    });
  };

  const openImagePreview = (url) => {
    if (url && url.length > 0 && !url.startsWith('blob:')) {
      previewImageUrl.value = url;
    }
  };
</script>