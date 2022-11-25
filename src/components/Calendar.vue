<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>
<script setup lang="ts">
import type { CalendarContentType, CalendarSimplifiedType } from '../composable/calendar';
import CalendarContent from './CalendarContent.vue';
import CalendarWeekTitle from './CalendarWeekTitle.vue';
import CalendarHeader from './CalendarHeader.vue';
import { Ref, ref } from 'vue';
const props = withDefaults(defineProps<{
  currentDate: Date;
}>(), {
});

const currentCalendarSimplified: Ref<CalendarSimplifiedType> = ref({
  year: props.currentDate.getFullYear(),
  month: props.currentDate.getMonth() + 1,
})

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
    <CalendarHeader
      v-model:currentDate="currentCalendarSimplified"
    ></CalendarHeader>
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
