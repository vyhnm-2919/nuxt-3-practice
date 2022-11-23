<script lang="ts" setup>
const tags = ref([]);

const fetchTag = async () => {
  await $fetch("http://localhost:5000/tags", {
    method: "GET",
  }).then((res) => {
    tags.value = res;
  });
};

const deleteTag = (id: number | any) => {
  const index = tags.value.findIndex((tag) => tag.id === id);
  if (index > -1) {
    tags.value.splice(index, 1);
  }
};

onMounted(() => {
  fetchTag();
});
</script>
<template>
  <div class="mt-4">
    <TagItem
      v-for="(tag, index) in tags"
      :tag="tag"
      :key="index"
      @deleteTag="deleteTag"
    />
  </div>
</template>
