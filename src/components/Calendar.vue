<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>
<script setup lang="ts">
import type { CalendarContentType } from '../composable/calendar';
import CalendarContent from './CalendarContent.vue';
import CalendarWeekTitle from './CalendarWeekTitle.vue';
const props = withDefaults(defineProps<{
  currentDate: Date;
}>(), {
});

const emit = defineEmits<{
  (e: 'update:editEvent', inputEvent: CalendarContentType): void;
}>()

const implementToEditCalendarEvent = (inputEvent: CalendarContentType) => {
  emit('update:editEvent', inputEvent)
}

</script>

<template>
  <section
    v-bind="$attrs"
    class="w-full"
  >
    <slot name="calendarHeader"></slot>
    <section
      class="mt-2"
    >
      <CalendarWeekTitle></CalendarWeekTitle>
      <CalendarContent
        @update:editEvent="implementToEditCalendarEvent"
        :currentDate="currentDate"
      ></CalendarContent>
    </section>
  </section>
</template>
<style scoped>

</style>
