<script setup lang="ts">
import { ref, Ref } from 'vue';
import CalendarHeader from './components/CalendarHeader.vue';
import Calendar from './components/Calendar.vue';
import type { 
  CalendarContentType,
  CalendarSimplifiedType,
} from './composable/calendar';
const currentDate = ref(new Date());
const testDate: Ref<CalendarSimplifiedType> = ref({
  year: currentDate.value.getFullYear(),
  month: currentDate.value.getMonth() + 1,
})

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
        v-model:currentDate="testDate"
      ></CalendarHeader>
    </template>
  </Calendar>
</template>

<style scoped></style>
