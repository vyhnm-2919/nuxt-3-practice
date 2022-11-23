<script lang="ts" setup>
import { ref } from "vue";
import isEqual from "lodash/isEqual";

const props = defineProps(["todo"]);
const emit = defineEmits(["updateTodo", "deleteTodo"]);
const { todo } = toRefs(props);

const isEdit = ref(false);
const title = ref("");

const handleCompleted = async () => {
  const temp = !todo?.value.isCompleted;
  await $fetch(`http://localhost:5000/todos/${todo?.value.id}`, {
    method: "PATCH",
    body: {
      isCompleted: temp,
    },
  })
    .then(() => {
      emit("updateTodo", {
        id: todo?.value.id,
        property: "isCompleted",
        status: temp,
      });
    })
    .catch((error) => console.log(error));
};

const handleChangeTitleTodo = async () => {
  await $fetch(`http://localhost:5000/todos/${todo?.value.id}`, {
    method: "PATCH",
    body: {
      title: title.value,
    },
  })
    .then(() => {
      emit("updateTodo", {
        id: todo?.value.id,
        property: "title",
        status: title.value,
      });
      isEdit.value = false;
    })
    .catch((error) => console.log(error));
};

const handleDeleteTodo = async () => {
  await $fetch(`http://localhost:5000/todos/${todo?.value.id}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      emit("deleteTodo", todo?.value.id);
    })
    .catch((error) => console.log(error));
};

onMounted(() => {
  title.value = todo?.value.title;
});
</script>
<template>
  <form @submit.prevent="handleChangeTitleTodo" class="flex mb-4 items-center">
    <p v-if="!isEdit" class="w-full text-grey-darkest">
      {{ todo.title }}
    </p>
    <input
      v-else
      v-model="title"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
      type="text"
      required
      placeholder="Title"
    />
    <button
      v-if="isEdit"
      type="submit"
      class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
      @click="handleChangeTitleTodo"
      :disabled="isEqual(title, todo.title)"
    >
      Done
    </button>
    <button
      type="button"
      class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
      @click="isEdit = !isEdit"
    >
      {{ isEdit ? "Cancel" : "Edit" }}
    </button>
    <button
      type="button"
      :class="[
        todo.isCompleted
          ? 'text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl  focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2'
          : 'text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl  focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2',
      ]"
      :disabled="isEdit"
      @click.prevent="handleCompleted"
    >
      {{ todo.isCompleted ? "Done" : "Do" }}
    </button>
    <button
      type="button"
      class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2"
      :disabled="isEdit"
      @click="handleDeleteTodo"
    >
      Remove
    </button>
  </form>
</template>
