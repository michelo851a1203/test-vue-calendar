<script setup lang="ts">
import { ref } from 'vue';
import CalendarHeader from './components/CalendarHeader.vue';
import Calendar from './components/Calendar.vue';
const currentDate = ref(new Date());


</script>

<template>
  <Calendar
    :currentDate="currentDate"
  >
    <template #calendarHeader>
      <CalendarHeader
        :currentDate="currentDate"
      ></CalendarHeader>
    </template>
  </Calendar>
</template>

<style scoped></style>
