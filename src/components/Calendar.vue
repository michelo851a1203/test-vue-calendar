<script setup lang="ts">
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
  </section>
</template>
<style scoped>

</style>
