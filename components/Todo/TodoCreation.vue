<script setup lang="ts">
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/20/solid";

const title = ref("");
const emit = defineEmits(["addTodo"]);

const addTodo = async () => {
  await $fetch("http://localhost:5000/todos", {
    method: "POST",
    body: {
      title: title.value,
      isCompleted: false,
    },
  })
    .then((res) => {
      emit("addTodo", {
        title: title.value,
        isCompleted: false,
      });
      title.value = "";
    })
    .catch((error) => console.log(error));
};

const reset = () => {
  title.value = "";
};
</script>

<template>
  <form @submit.prevent="addTodo">
    <div class="flex items-center justify-between mt-4">
      <div class="border flex items-center mr-4 rounded shadow w-full">
        <input
          v-model="title"
          class="appearance-none w-full px-5 py-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          required
          placeholder="Enter the title"
        />
        <XMarkIcon
          v-if="!!title"
          class="h-6 w-6 mx-2 cursor-pointer"
          :disabled="!title"
          @click="reset"
        />
      </div>
      <button
        type="submit"
        class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
      >
        Add
      </button>
    </div>
  </form>
</template>

<style></style>
