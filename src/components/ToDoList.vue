<script setup lang="ts">
import { ref } from "vue";

interface ListItem {
  id: number;
  title: string;
}

const ListItems: ListItem[] = ref([
  {
    id: 1,
    title: "Learn Vue",
  },
  {
    id: 2,
    title: "Cook cookies",
  },
]);

const addNew = () => {
  const newItem = {
    id: ListItems.value.length + 1,
    title: "die",
  };
  ListItems.value.push(newItem);
};

const deleteLast = () => {
  ListItems.value.pop();
};

const isBtnDisabled = () => {
  return ListItems.value.length ? false : true;
};
</script>

<template>
  <div>
    <h3>This is a list</h3>
  </div>
  <div class="btns-wrapper">
    <button @click="addNew">Add new</button>
    <button :disabled="isBtnDisabled()" @click="deleteLast">Delete last</button>
  </div>
  <ol>
    <li v-for="item in ListItems" :key="item.id">
      {{ item.title }}
    </li>
  </ol>
</template>

<style scoped>
.btns-wrapper {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

ol {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
