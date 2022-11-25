<script setup lang="ts">
import { useCalendar } from '../composable/calendar';
import type { CalendarSimplifiedType } from '../composable/calendar';

const props = withDefaults(defineProps<{
  currentDate: CalendarSimplifiedType;
}>(), {
})

const emit = defineEmits<{
  (e: 'update:currentDate', inputDate: CalendarSimplifiedType): void;
}>()

const {
  dateFormatToMainTitleFromCalendarSimplified,
  addMonth,
} = useCalendar();

const previewMonthClick = () => {
  const currentDateObject = props.currentDate;
  const currentDate = new Date(currentDateObject.year, currentDateObject.month - 1);
  const resultDate = addMonth(-1, currentDate);
  emit('update:currentDate', {
    year: resultDate.getFullYear(),
    month: resultDate.getMonth() + 1,
  })
}

const nextMonthClick = () => {
  const currentDateObject = props.currentDate;
  const currentDate = new Date(currentDateObject.year, currentDateObject.month - 1);
  const resultDate = addMonth(1, currentDate);
  emit('update:currentDate', {
    year: resultDate.getFullYear(),
    month: resultDate.getMonth() + 1,
  })
}

</script>

<template>
<section
  class="flex items-center px-3 py-4 space-x-2 w-full box-border"
>
  <div class="flex items-center flex-grow space-x-4">
    <div
      class="text-xl font-bold"
    >
      {{ dateFormatToMainTitleFromCalendarSimplified(currentDate) }}
    </div>
    <button
      @click="previewMonthClick"
      class="i-uil-angle-left-b text-lg cursor-pointer"
    ></button>
    <button
      @click="nextMonthClick"
      class="i-uil-angle-right-b text-lg cursor-pointer"
    >
    </button>
    <button
      class="
        rounded-full w-10 h-10 border-2 border-gray-300
        bg-transparent flex items-center justify-center cursor-pointer
      "
    >
      <div
        class="i-material-symbols-calendar-month-rounded text-lg"
      ></div>
    </button>
  </div>
  <div
    class="pr-2"
  >
    <button
      class="
        px-3 py-2 rounded-md border-none 
        bg-blue-500 text-white hover:bg-blue-800
      "
    >
      新增晨更(同翱)
    </button>
  </div>
  </section>
</template>
