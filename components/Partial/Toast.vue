<script setup lang="ts">
import { ref, onMounted } from "vue";

const toastIsVisible = ref(false);
const message = ref("");
const state = ref("");

onMounted(() => {
  $store.subscribe((mutation: any, state: any) => {
    if (mutation.type === "toast/showToast") {
      message.value = state.toast.content;
      state.value = state.toast.state;
      toastIsVisible.value = true;
      document.querySelector(".toast-element")?.classList.add("enter");
      setTimeout(() => {
        if (toastIsVisible) {
          removeToast();
        }
      }, 3000);
    }
  });
});

const removeToast = () => {
  document.querySelector(".toast-element")?.classList.replace("enter", "leave");
  setTimeout(() => {
    toastIsVisible.value = false;
  }, 240);
};
</script>
<template>
  <div class="toast-element">
    <div
      :class="[
        'toast-container',
        { success: state === 'success', error: state === 'error' },
      ]"
    >
      <div class="icon">
        <svg
          v-if="state === 'success'"
          width="8"
          height="7"
          viewBox="0 0 8 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.96304 0.962891L2.88896 5.37647L1.03711 3.3703"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-else
          width="3"
          height="10"
          viewBox="0 0 3 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.6665V4.99984"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1 8.3335H1.00833"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <p>
        {{ message }}
      </p>
    </div>
  </div>
</template>
