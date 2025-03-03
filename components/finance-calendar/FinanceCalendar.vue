<template>
  <Card :class="[isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border border-slate-200']">
    <CardContent class="p-6">
      <div class="space-y-4">
        <div class="flex justify-between items-center px-2">
          <h2 :class="[
            'text-lg font-medium',
            isDarkMode ? 'text-white' : 'text-slate-900'
          ]">
            {{ formatMonthYear(currentMonth) }}
          </h2>
          <div class="flex gap-2">
            <button
                @click="emit('update:currentMonth', getPreviousMonth(currentMonth))"
                :class="[
                'h-7 w-7 hover:opacity-75 rounded-md flex items-center justify-center',
                isDarkMode ? 'text-white hover:bg-gray-700' : 'text-slate-600 hover:bg-slate-100'
              ]"
            >
              <ChevronLeftIcon/>
            </button>
            <button
                @click="emit('update:currentMonth', getNextMonth(currentMonth))"
                :class="[
                'h-7 w-7 hover:opacity-75 rounded-md flex items-center justify-center',
                isDarkMode ? 'text-white hover:bg-gray-700' : 'text-slate-600 hover:bg-slate-100'
              ]"
            >
              <ChevronRightIcon/>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1">
          <template v-for="day in weekDays" :key="day">
            <div :class="[
              'text-center text-sm font-medium p-1',
              isDarkMode ? 'text-gray-300' : 'text-slate-500'
            ]">
              {{ day }}
            </div>
          </template>

          <template v-for="date in calendarDays" :key="date?.toISOString() || Math.random()">
            <div
                @click="date && emit('update:selectedDate', date)"
                class="relative flex items-center justify-center h-10"
            >
              <div v-if="date" :class="[
                'h-8 w-8 flex items-center justify-center rounded-md',
                date.toDateString() === selectedDate?.toDateString()
                  ? 'bg-emerald-500 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                    : 'bg-white text-slate-900 hover:bg-slate-100',
                isToday(date) && 'font-bold',
                isDarkMode && isToday(date) ? 'text-emerald-400' : '',
                !isDarkMode && isToday(date) ? 'text-emerald-600' : ''
              ]">
                {{ date.getDate() }}
              </div>
              <div v-else class="h-8 w-8"></div>
              <div v-if="date && getMovementsForDate(date).length > 0" class="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-0.5 pb-1">
                <template v-for="(movement, index) in getMovementsForDate(date).slice(0, 2)" :key="movement.id">
                  <div class="relative">
                    <component :is="getMovementIcon(movement.name)" class="w-4 h-4" :class="getIconColor(movement.name)" />
                  </div>
                </template>
                <span
                    v-if="getMovementsForDate(date).length > 2"
                    class="text-xs font-medium bg-gray-700 text-white rounded-full w-4 h-4 flex items-center justify-center"
                >
                  +{{ getMovementsForDate(date).length - 2 }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  import { Music, Video, CreditCard, ChevronRightIcon, ChevronLeftIcon } from 'lucide-vue-next';
  import type { CalendarProps, Movement } from '~/types/finance';
  import { formatMonthYear } from '~/utils/formatters';
  import { getCalendarDays, getPreviousMonth, getNextMonth } from '~/utils/dateHelpers';

  const props = defineProps<CalendarProps>();
  const emit = defineEmits(['update:selectedDate', 'update:currentMonth']);

  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const calendarDays = computed(() => {
    return getCalendarDays(props.currentMonth);
  });

  const getMovementsForDate = (date: Date | null): Movement[] => {
    if (!date) return [];
    if (!props.movements || !Array.isArray(props.movements)) return [];
    return props.movements.filter(movement => {
      const movementDate = new Date(movement.date);
      return movementDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getMovementIcon = (name: string) => {
    if (!name) return CreditCard;
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('spotify')) return Music;
    if (lowercaseName.includes('netflix') || lowercaseName.includes('amazon') || lowercaseName.includes('prime')) return Video;
    return CreditCard;
  };

  const getIconColor = (name: string): string => {
    if (!name) return 'text-gray-500';
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('spotify')) return 'text-green-500';
    if (lowercaseName.includes('netflix')) return 'text-red-500';
    if (lowercaseName.includes('amazon') || lowercaseName.includes('prime')) return 'text-blue-500';
    return 'text-gray-500';
  };
</script>