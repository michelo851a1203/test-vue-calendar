<script setup lang="ts">
import { useCalendar } from '../composable/calendar';
import CalendarWeekTitle from './CalendarWeekTitle.vue';
const props = withDefaults(defineProps<{
  currentDate: Date;
}>(), {
})

const {
  getFirstCalendarDate,
  getLastCalendarDate,
  getCurrentCalendarArray,
} = useCalendar(props.currentDate);

console.log(`%c start: ${getFirstCalendarDate.value}`, 'color: red;');
console.log(getCurrentCalendarArray.value);
console.log(`%c end: ${getLastCalendarDate.value}`, 'color: red;');



</script>

<template>
  <section
    class="w-full"
  >
    <slot name="calendarHeader"></slot>
    <section
      class="mt-2"
    >
      <CalendarWeekTitle></CalendarWeekTitle>
      <section>

      </section>
    </section>
  </section>
</template>
<style scoped>

</style>
