<script setup lang="ts">
import type {
  CalendarHolidayType,
  AddedCalendarEventType,
  CalendarEventType,
} from '../composable/calendar'
import {
  useCalendar,
} from '../composable/calendar';
import type { CalendarContentType } from '../composable/calendar'
import { watch } from 'vue';
const props = withDefaults(defineProps<{
  currentDate: Date;
  holidayList?: CalendarHolidayType[];
  newEvent: AddedCalendarEventType | null;
  updatedEvent: CalendarEventType | null;
}>(), {
  holidayList: () => [] as CalendarHolidayType[],
})

const emit = defineEmits<{
  (e: 'update:editEvent', inputEvent: CalendarContentType): void;
  (e: 'update:returnNewEventResponse', id: string): void;
  (e: 'update:isUpdatedEventSuccess', isUpdated: boolean): void;
}>()

const {
  getCurrentCalendarArray,
  currentMonth,
  setCurrentDate,
  addEvent,
  updateEvent,
  setNewHolidayList,
} = useCalendar(props.currentDate);

setNewHolidayList(props.holidayList);

watch(() => props.currentDate, (newUpdatedCurrentDate: Date) => {
  setCurrentDate(newUpdatedCurrentDate);
});

watch(() => props.newEvent, (newEventInfo: AddedCalendarEventType | null) => {
  if (newEventInfo === null) return;
  const id = addEvent(newEventInfo);
  emit('update:returnNewEventResponse', id);
});

watch(() => props.updatedEvent, (updatedEventInfo: CalendarEventType | null) => {
  if (updatedEventInfo === null) return;
  const isUpdated = updateEvent(updatedEventInfo);
  emit('update:isUpdatedEventSuccess', isUpdated);
});

watch(() => props.holidayList, (newHolidayList?: CalendarHolidayType[]) => {
  if (typeof newHolidayList === 'undefined') return;
  setNewHolidayList(newHolidayList);
})

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
