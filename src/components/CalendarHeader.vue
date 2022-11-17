<script setup lang="ts">
const props = withDefaults(defineProps<{
  currentDate: Date;
}>(), {
})

const dateFormatToMainTitle = (inputDate: Date) => {
  const yyyy = inputDate.getFullYear();
  let MM = (inputDate.getMonth() + 1).toString();
  if (MM.length === 1) { MM = `0${MM}` }
  return `${yyyy}年${MM}月`
}

</script>

<template>
<section
  class="flex items-center px-3 py-4 space-x-2 w-full box-border"
>
  <div class="flex items-center flex-grow">
    <div
      class="text-xl font-bold"
    >
      {{ dateFormatToMainTitle(currentDate) }}
    </div>
    <button
      class="i-uil-angle-left-b text-lg cursor-pointer"
    ></button>
    <button
      class="i-uil-angle-right-b text-lg cursor-pointer"
    >
    </button>
    <button
      class="
        rounded-full w-10 h-10 border-2 border-gray-300
        bg-transparent flex items-center justify-center cursor-pointer
      "
    >
      <div
        class="i-material-symbols-calendar-month-rounded text-lg"
      ></div>
    </button>
  </div>
  <div
    class="pr-2"
  >
    <button
      class="
        px-3 py-2 rounded-md border-none 
        bg-blue-500 text-white hover:bg-blue-800
      "
    >
      新增晨更(同翱)
    </button>
  </div>
  </section>
</template>
