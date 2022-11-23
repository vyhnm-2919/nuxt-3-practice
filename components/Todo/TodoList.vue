<script setup lang="ts">
import { e } from "unimport/dist/types-488f6d65";
import { onMounted, ref } from "vue";
import { TodoDTO } from "~~/models/todo";

const todos = ref([]);
const keySelected = ref(Date.now());

const loadTodos = async () => {
  await $fetch("http://localhost:5000/todos", {
    method: "GET",
  }).then((res) => {
    todos.value = res;
  });
};

const updateTodo = (params: {
  id: any;
  property: string;
  status: boolean | string;
}) => {
  const index = todos.value.findIndex(
    (todo: TodoDTO | any) => todo.id === params.id
  );
  if (index > -1) {
    todos.value[index][params.property] = params.status;
  }
};

const deleteTodo = async (id: any) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  if (index > -1) {
    todos.value.splice(index, 1);
  }
};

onMounted(() => {
  loadTodos();
});
</script>

<template>
  <TodoItem
    v-for="(todo, index) in todos"
    :todo="todo"
    :key="index"
    @updateTodo="updateTodo"
    @deleteTodo="deleteTodo"
  />
</template>
