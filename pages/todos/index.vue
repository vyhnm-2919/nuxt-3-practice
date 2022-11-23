<script setup lang="ts">
import { ref } from "vue";

const keySelected = ref(Date.now());

const addTodo = () => {
  keySelected.value++;
};
</script>
<template>
  <div class="bg-white rounded shadow p-6 w-full lg:w-1/2" :key="keySelected">
    <div class="mb-4">
      <h1 class="text-grey-darkest">Todo List</h1>
      <TodoCreation @addTodo="addTodo" />
    </div>
    <hr class="my-4" />
    <TodoList :key="keySelected" />
  </div>
</template>
