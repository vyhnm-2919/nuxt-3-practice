<script setup lang="ts">
import { ref } from "vue";
import { ColorDTO, colours } from "@/models/color";

import { XMarkIcon } from "@heroicons/vue/20/solid";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

const tag = ref({
  title: "",
  color: {
    id: "",
    name: "",
    background: "",
  },
});
const isOpen = ref(false);
const isShowAddTagSection = ref(false);
const keySelected = ref(Date.now());
const errors = ref({
  title: "",
  color: "",
});

const addTag = async () => {
  resetError();
  if (!tag.value.title) {
    errors.value.title = "Please enter tag title";
  }
  if (!tag.value.color || !tag.value.color.id) {
    errors.value.color = "Please select tag color";
  }
  if (!errors.value.title && !errors.value.color) {
    await $fetch("http://localhost:5000/tags", {
      method: "POST",
      body: {
        title: tag.value.title,
        color: tag.value.color,
      },
    })
      .then(() => {
        keySelected.value++;
        reset();
      })
      .catch((error) => console.log(error));
  }
};

const resetError = () => {
  errors.value = { title: "", color: "" };
};

const reset = () => {
  tag.value = {
    title: "",
    color: {
      id: "",
      name: "",
      background: "",
    },
  };
};

const handleSelectColor = (color: ColorDTO) => {
  tag.value.color = color;
  isOpen.value = false;
};

const colors = computed(() => {
  return colours;
});
</script>

<template>
  <div class="bg-white rounded shadow p-6 w-full lg:w-1/3">
    <button
      type="button"
      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      @click="isShowAddTagSection = !isShowAddTagSection"
    >
      Add tag
    </button>
    <form v-if="isShowAddTagSection" @submit.prevent="addTag">
      <div class="flex items-center justify-between mt-4">
        <div
          v-if="tag.color.background"
          :class="`w-10 h-10 rounded-full mr-4 ${tag.color.background}`"
        ></div>
        <div class="border flex items-center mr-4 rounded shadow flex-auto">
          <input
            v-model="tag.title"
            class="appearance-none w-full px-5 py-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter the title"
          />
          <XMarkIcon
            v-if="!!tag.title"
            class="h-6 w-6 mx-2 cursor-pointer"
            :disabled="!tag.title"
            @click="reset"
          />
        </div>
        <div class="relative">
          <button
            class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="isOpen = !isOpen"
          >
            <p class="whitespace-nowrap">Pick color</p>
            <ChevronDownIcon />
          </button>
          <!-- Dropdown menu -->
          <div
            v-if="isOpen"
            class="z-10 w-60 bg-white rounded shadow dark:bg-gray-700 absolute mt-4"
          >
            <ul
              class="dark:text-gray-200 overflow-y-auto py-2 text-gray-700 max-h-[300px]"
            >
              <li
                class="flex items-center hover:bg-gray-100 p-2 cursor-pointer"
                v-for="color in colors"
                :key="color.id"
                @click="handleSelectColor(color)"
              >
                <div
                  :class="`w-10 h-10 rounded-full mr-4 ${color.background}`"
                ></div>
                <span>{{ color.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <button
          type="submit"
          class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Add
        </button>
      </div>
      <p
        v-for="key in Object.keys(errors)"
        :key="key"
        class="text-red-600 mt-3 text-sm"
      >
        {{ errors[key] }}
      </p>
    </form>
    <TagList :key="keySelected" />
  </div>
</template>

<style></style>
