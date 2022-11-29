<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>
<script setup lang="ts">
import type { 
  AddedCalendarEventType,
  CalendarContentType,
  CalendarHolidayType, 
  CalendarEventType,
} from '../composable/calendar';
import CalendarContent from './CalendarContent.vue';
import CalendarWeekTitle from './CalendarWeekTitle.vue';
import CalendarHeader from './CalendarHeader.vue';
import { Ref, ref, watch } from 'vue';
const props = withDefaults(defineProps<{
  currentDate: string;
  newEvent: AddedCalendarEventType | null;
  updateEvent: CalendarEventType | null;
  holidayList?: CalendarHolidayType[]
}>(), {
  holidayList: () => [] as CalendarHolidayType[],
});

const currentDateRef: Ref<string> = ref(props.currentDate);

const emit = defineEmits<{
  (e: 'update:currentDate', inputDate: string): void;
  (e: 'update:editEvent', inputEvent: CalendarContentType): void;
  (e: 'update:newEvent', inputEvent: AddedCalendarEventType | null): void;
  (e: 'update:updateEvent', inputEvent: CalendarEventType | null): void;
  (e: 'update:returnNewEventResponse', id: string): void;
  (e: 'update:isUpdatedEventSuccess', isUpdated: boolean): void;
}>()

watch(currentDateRef, (currentDateRefInfo: string) => {
  emit('update:currentDate', currentDateRefInfo);
});

const implementToEditCalendarEvent = (inputEvent: CalendarContentType) => {
  emit('update:editEvent', inputEvent)
}

watch(() => props.newEvent, (newEventInfo: AddedCalendarEventType | null) => {
  if (newEventInfo === null) return;
  emit('update:newEvent', null);
});

const sendNewEventId = (id: string) => {
  emit('update:returnNewEventResponse', id);
}

const isUpdatedEventSuccess = (isUpdated: boolean) => {
  emit('update:isUpdatedEventSuccess', isUpdated);
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
        :newEvent="newEvent"
        :updatedEvent="updateEvent"
        @update:editEvent="implementToEditCalendarEvent"
        @update:returnNewEventResponse="sendNewEventId"
        @update:isUpdatedEventSuccess="isUpdatedEventSuccess"
        :currentDate="new Date(currentDate)"
        :holidayList="holidayList"
      ></CalendarContent>
    </section>
  </section>
</template>
<style scoped>

</style>
