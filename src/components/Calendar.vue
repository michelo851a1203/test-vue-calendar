<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>
<script setup lang="ts">
import type { 
  CalendarContentType,
} from '../composable/calendar';
import CalendarContent from './CalendarContent.vue';
import CalendarWeekTitle from './CalendarWeekTitle.vue';
import CalendarHeader from './CalendarHeader.vue';
import { Ref, ref, watch } from 'vue';
const props = withDefaults(defineProps<{
  currentDate: string;
}>(), {
});

const currentDateRef: Ref<string> = ref(props.currentDate);

const emit = defineEmits<{
  (e: 'update:currentDate', inputDate: string): void;
  (e: 'update:editEvent', inputEvent: CalendarContentType): void;
}>()

watch(currentDateRef, (currentDateRefInfo: string) => {
  emit('update:currentDate', currentDateRefInfo);
});

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
      v-model:currentDate="currentDateRef"
    ></CalendarHeader>
    <section
      class="mt-2"
    >
      <CalendarWeekTitle></CalendarWeekTitle>
      <CalendarContent
        @update:editEvent="implementToEditCalendarEvent"
        :currentDate="new Date(currentDate)"
      ></CalendarContent>
    </section>
  </section>
</template>
<style scoped>

</style>
