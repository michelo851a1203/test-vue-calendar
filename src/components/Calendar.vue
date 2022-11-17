<script setup lang="ts">
import CalendarWeekTitle from './CalendarWeekTitle.vue';
const props = withDefaults(defineProps<{
  currentDate: Date;
}>(), {
})



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

    </section>
  </section>
</template>
<style scoped>

</style>
