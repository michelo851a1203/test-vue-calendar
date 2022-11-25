<script setup lang="ts">
import { useCalendar } from '../composable/calendar';

const props = withDefaults(defineProps<{
  currentDate: string;
}>(), {
})

const emit = defineEmits<{
  (e: 'update:currentDate', inputDate: string): void;
}>()

const {
  dateFormatToMainTitleFromString,
  addMonth,
} = useCalendar();

const previewMonthClick = () => {
  if (Number.isNaN(Date.parse(props.currentDate))) return;
  const currentDate = new Date(props.currentDate);
  const newCurrentDate = addMonth(-1, currentDate);
  emit('update:currentDate', newCurrentDate.toDateString());
}

const nextMonthClick = () => {
  if (Number.isNaN(Date.parse(props.currentDate))) return;
  const currentDate = new Date(props.currentDate);
  const newCurrentDate = addMonth(1, currentDate);
  emit('update:currentDate', newCurrentDate.toDateString());
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
      {{ dateFormatToMainTitleFromString(currentDate) }}
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
