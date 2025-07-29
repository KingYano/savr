<template>
  <div :class="[
   'rounded-xl overflow-hidden',
   isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white',
   isDarkMode ? 'border-white/10' : 'border border-gray-200'
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
           isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'
         ]"
        >
          <ChevronLeft class="h-5 w-5" :class="isDarkMode ? 'text-white/60' : 'text-gray-600'" />
        </button>

        <span :class="isDarkMode ? 'text-white' : 'text-gray-900'">
         {{ formatMonth(internalCurrentMonth) }}
       </span>

        <button
            @click="nextMonth"
            :class="[
           'p-1 rounded-md',
           isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'
         ]"
        >
          <ChevronRight class="h-5 w-5" :class="isDarkMode ? 'text-white/60' : 'text-gray-600'" />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-px" :class="isDarkMode ? 'bg-gray-800' : 'bg-gray-200'">
      <div
          v-for="day in daysOfWeek"
          :key="day"
          class="p-2 text-center text-sm font-medium"
          :class="isDarkMode ? 'bg-[#1A1A1A] text-white/60' : 'bg-white text-gray-500'"
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
         isDarkMode ? 'bg-[#1A1A1A]' : 'bg-white',
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
              <template v-for="(movement) in getDayMovementsForDay(day.date).slice(0, 4)" :key="`desktop-${movement.id}`">
                <div style="position: relative; width: 28px; height: 28px;"
                     class="rounded-full"
                     :style="movement.type === 'income'
                         ? (isDarkMode ? 'background-color: rgb(22, 101, 52);' : 'background-color: rgb(220, 252, 231);')
                         : (isDarkMode ? 'background-color: rgb(153, 27, 27);' : 'background-color: rgb(254, 226, 226);')">
                  <img v-if="movement.imageUrl && movement.imageUrl.length > 0"
                       :src="movement.imageUrl"
                       alt=""
                       class="rounded-full"
                       style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
                       @click.stop="openImagePreview(movement.imageUrl)" />
                  <ArrowDownCircle v-else-if="movement.type === 'expense'"
                                   class="w-4 h-4"
                                   :class="isDarkMode ? 'text-red-200' : 'text-red-500'"
                                   style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
                  <ArrowUpCircle v-else
                                 class="w-4 h-4"
                                 :class="isDarkMode ? 'text-green-200' : 'text-green-500'"
                                 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

                  <div v-if="movement.isRecurrent || movement.isGeneratedRecurrence"
                       style="position: absolute; top: -4px; right: -4px; width: 16px; height: 16px; background-color: rgb(251, 191, 36); border-radius: 50%; border: 1px solid white; z-index: 10; display: flex; align-items: center; justify-content: center;">
                    <Repeat class="w-3 h-3 text-white" />
                  </div>
                </div>
              </template>

              <div v-if="getDayMovementsForDay(day.date).length > 4"
                   class="rounded-full"
                   style="width: 28px; height: 28px; background-color: rgb(37, 99, 235); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem;">
                +{{ getDayMovementsForDay(day.date).length - 4 }}
              </div>
            </div>

            <div class="flex md:hidden flex-wrap gap-1">
              <template v-for="(movement) in getDayMovementsForDay(day.date).slice(0, 2)" :key="`mobile-${movement.id}`">
                <div style="position: relative; width: 24px; height: 24px;"
                     class="rounded-full"
                     :style="movement.type === 'income'
                         ? (isDarkMode ? 'background-color: rgb(22, 101, 52);' : 'background-color: rgb(220, 252, 231);')
                         : (isDarkMode ? 'background-color: rgb(153, 27, 27);' : 'background-color: rgb(254, 226, 226);')">
                  <img v-if="movement.imageUrl && movement.imageUrl.length > 0"
                       :src="movement.imageUrl"
                       alt=""
                       class="rounded-full"
                       style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
                       @click.stop="openImagePreview(movement.imageUrl)" />
                  <ArrowDownCircle v-else-if="movement.type === 'expense'"
                                   class="w-4 h-4"
                                   :class="isDarkMode ? 'text-red-200' : 'text-red-500'"
                                   style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
                  <ArrowUpCircle v-else
                                 class="w-4 h-4"
                                 :class="isDarkMode ? 'text-green-200' : 'text-green-500'"
                                 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />

                  <div v-if="movement.isRecurrent || movement.isGeneratedRecurrence"
                       style="position: absolute; top: -4px; right: -4px; width: 12px; height: 12px; background-color: rgb(251, 191, 36); border-radius: 50%; border: 1px solid white; z-index: 10; display: flex; align-items: center; justify-content: center;">
                    <Repeat class="w-2 h-2 text-white" />
                  </div>
                </div>
              </template>

              <div v-if="getDayMovementsForDay(day.date).length > 2"
                   class="rounded-full"
                   style="width: 24px; height: 24px; background-color: rgb(37, 99, 235); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.625rem;">
                +{{ getDayMovementsForDay(day.date).length - 2 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
  </div>
</template>

<script setup>
  import {ChevronLeft, ChevronRight, Repeat, ArrowUpCircle, ArrowDownCircle} from 'lucide-vue-next';
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { useFinance } from '~/composables/useFinance';

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
  const financeData = useFinance();
  const updateTrigger = ref(0);

  watch(() => financeData.movements.value, () => {
    updateTrigger.value++;
  }, { deep: true });

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

  const getDayMovementsForDay = (date) => {
    updateTrigger.value;
    return financeData.getDayMovements(date);
  };

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

  const openImagePreview = (url) => {
    if (url && url.length > 0 && !url.startsWith('blob:')) {
      previewImageUrl.value = url;
    }
  };
</script>