<script setup lang="ts">
import { ref } from 'vue';
import Calendar from './components/Calendar.vue';
import type { 
  CalendarContentType,
} from './composable/calendar';
const currentDate = ref((new Date()).toDateString());

const testEvent = (input: CalendarContentType) => {
  console.log(input);
}

</script>

<template>
  <Calendar
    v-model:currentDate="currentDate"
    @update:editEvent="testEvent"
  ></Calendar>
</template>

<style scoped></style>
