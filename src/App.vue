<script setup lang="ts">
import { ref, Ref } from 'vue';
import Calendar from './components/Calendar.vue';
import type { 
  AddedCalendarEventType,
  CalendarContentType, 
} from './composable/calendar';
const currentDate = ref((new Date()).toDateString());
const addedNewEvent: Ref<AddedCalendarEventType | null> = ref(null);

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
    v-model:currentDate="currentDate"
    @update:editEvent="getCurrentEvent"
    @update:returnNewEventResponse="getAddedEventReturnId"
  ></Calendar>
</template>

<style scoped></style>
