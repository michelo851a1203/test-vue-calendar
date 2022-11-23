<script setup lang="ts">
import { useCalendar  } from '../composable/calendar';
import type { CalendarContentType } from '../composable/calendar'
const props = withDefaults(defineProps<{
  currentDate: Date;
}>(), {
})

const emit = defineEmits<{
  (e: 'update:editEvent', inputEvent: CalendarContentType): void;
}>()

const {
  getCurrentCalendarArray,
  currentMonth,
} = useCalendar(props.currentDate);

const emitEventFromContentToCalendar = (inputEvent: CalendarContentType) => {
  emit('update:editEvent', inputEvent);
}
</script>

<template>
  <section
    class="flex items-center"
    v-for="calendarRowItem in getCurrentCalendarArray"
    :key="calendarRowItem.id"
  >
    <div
      class="
        border-0.5 border-gray-400 w-1/7 h-[calc(15vh)] 
        text-center text-sm px-3 py-2 box-border space-y-2
      "
      :class="{
        'bg-gray-300': calendarEntryItem.calendarDate.split('/')[0] !== currentMonth.toString(),
      }"
      v-for="calendarEntryItem in calendarRowItem.content"
      :key="calendarEntryItem.id"
    >
      <h4 
        class="block font-normal m-0"
      >
        {{ calendarEntryItem.calendarDate }}
      </h4>
      <div 
        class="px-3 box-border w-full border-none bg-transparent"
      >
        <button
          @click="emitEventFromContentToCalendar(calendarEntryItem)"
          class="h-full px-3 py-1 border-none cursor-pointer w-full rounded-md"
          :class="{
            'bg-blue-500 text-white': calendarEntryItem.eventTitle !== '',
            'bg-gray-200': calendarEntryItem.eventTitle === '',
          }"
        >
          {{ calendarEntryItem.eventTitle !== '' ? calendarEntryItem.eventTitle : '+' }}
        </button>
      </div>
      <section 
        class="text-green-600"
        v-if="calendarEntryItem.holiday !== ''"
      >
        {{ calendarEntryItem.holiday }}
      </section>
    </div>
  </section>
</template>
