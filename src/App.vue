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
    dateTitle: '12/5',
    eventName: 'testing'
  }
}

</script>

<template>
  <Calendar
    v-model:newEvent="addedNewEvent"
    v-model:currentDate="currentDate"
    @update:editEvent="getCurrentEvent"
  ></Calendar>
</template>

<style scoped></style>
