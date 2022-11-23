<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>
<script setup lang="ts">
import CalendarContent from './CalendarContent.vue';
import CalendarWeekTitle from './CalendarWeekTitle.vue';
const props = withDefaults(defineProps<{
  currentDate: Date;
}>(), {
})

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
        :currentDate="currentDate"
      ></CalendarContent>
    </section>
  </section>
</template>
<style scoped>

</style>
