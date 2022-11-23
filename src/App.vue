<script setup lang="ts">
import { ref } from 'vue';
import CalendarHeader from './components/CalendarHeader.vue';
import Calendar from './components/Calendar.vue';
import type { CalendarContentType } from './composable/calendar';
const currentDate = ref(new Date());

const testEvent = (input: CalendarContentType) => {
  console.log(input);
}

</script>

<template>
  <Calendar
    :currentDate="currentDate"
    @update:editEvent="testEvent"
  >
    <template #calendarHeader>
      <CalendarHeader
        v-model:currentDate="currentDate"
      ></CalendarHeader>
    </template>
  </Calendar>
</template>

<style scoped></style>
