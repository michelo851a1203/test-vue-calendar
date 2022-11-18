<script setup lang="ts">
import { useCalendar } from '../composable/calendar';

const {
  weekName,
} = useCalendar()

</script>

<template>
  <section
    class="bg-black text-white flex items-center"
  >
    <div
      class="
        w-1/7 text-center border-x-1 border-gray-400
        py-2
      "
      v-for="weekItem in weekName"
      :key="weekItem"
    >
      {{ weekItem }}
    </div>
  </section>
</template>
