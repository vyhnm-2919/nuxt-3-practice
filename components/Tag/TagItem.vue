<script lang="ts" setup>
import { TrashIcon } from "@heroicons/vue/20/solid";
const props = defineProps(["tag"]);
const { tag } = toRefs(props);
const emit = defineEmits(["deleteTag", "deleteTodo"]);

const handleDeleteTag = async () => {
  await $fetch(`http://localhost:5000/tags/${tag?.value.id}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      emit("deleteTag", tag?.value.id);
    })
    .catch((error) => console.log(error));
};
</script>
<template>
  <li
    class="py-2 px-4 w-full rounded-t-lg border-gray-200 dark:border-gray-600 flex items-center"
  >
    <div :class="`w-6 h-6 rounded-full mr-3 ${tag.color.background}`"></div>
    <p class="flex-auto">{{ tag.title }}</p>
    <TrashIcon
      class="h-4 w-4 mx-2 cursor-pointer"
      @click.prevent="handleDeleteTag"
    />
  </li>
</template>
