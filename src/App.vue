<script setup lang="ts">
import { ref, Ref } from 'vue';
import Calendar from './components/Calendar.vue';
import type { 
  AddedCalendarEventType,
  CalendarContentType, 
  CalendarHolidayType,
  CalendarEventType,
} from './composable/calendar';
const currentDate = ref((new Date()).toDateString());
const addedNewEvent: Ref<AddedCalendarEventType | null> = ref(null);
const updateNewEvent: Ref<CalendarEventType | null> = ref(null);
const currentHolidayList: Ref<CalendarHolidayType[]> = ref([
  {
    dateTitle: '11/28',
    HolidayName: '測試的日期',
  }
]);

const currentId = ref('');

const getCurrentEvent = (input: CalendarContentType) => {
  console.log(input);
}

const addOrUpdateEvent = () => {
  addedNewEvent.value = {
    dateTitle: '11/28',
    eventName: 'testing'
  }
}

const getAddedEventReturnId = (id: string) => {
  console.group('%c 這裡可以拿到剛才編輯或新增事件的 id', 'color: yellow;');
  console.log(id);
  console.groupEnd();
  currentId.value = id;
}

const isUpdatedSuccessDetect = (isUpdated: boolean) => {
  console.log(isUpdated);
}

</script>

<template>
  <button
    class="
      px-3 py-2 rounded-full 
      bg-blue-400 text-white border-none hover:bg-blue-800
      cursor-pointer
    "
    @click="addOrUpdateEvent"
  >Add Event Test</button>

  <Calendar
    v-model:newEvent="addedNewEvent"
    v-model:updateEvent="updateNewEvent"
    v-model:currentDate="currentDate"
    :holidayList="currentHolidayList"
    @update:editEvent="getCurrentEvent"
    @update:returnNewEventResponse="getAddedEventReturnId"
    @update:isUpdatedEventSuccess="isUpdatedSuccessDetect"
  ></Calendar>
</template>

<style scoped></style>
