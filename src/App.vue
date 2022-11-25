<script setup lang="ts">
import { ref } from 'vue';
import Calendar from './components/Calendar.vue';
import type { 
  CalendarContentType,
} from './composable/calendar';
const currentDate = ref(new Date());

const testEvent = (input: CalendarContentType) => {
  console.log(input);
}

</script>

<template>
  <Calendar
    :currentDate="currentDate"
    @update:editEvent="testEvent"
  ></Calendar>
</template>

<style scoped></style>
