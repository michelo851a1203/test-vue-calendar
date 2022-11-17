<script setup lang="ts">
const weekName = [
  '週日', 
  '週一', 
  '週二', 
  '週三', 
  '週四', 
  '週五', 
  '週六', 
];

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
