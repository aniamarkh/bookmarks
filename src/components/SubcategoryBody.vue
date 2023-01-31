<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { store } from "../store";

const props = defineProps({
  subcategory: Object,
});
const input_category: Ref<string> = ref(props.subcategory.title);
const isOpen: Ref<boolean> = ref(false);

</script>

<template>
  <div class="subcategory-wrapper" @click="isOpen=!isOpen">
    <h4 class="subcategory-title">
      <div v-if="!isOpen" class="icon">
        <img src="./assets/arrow-right.svg" alt="close"/>
      </div>
      <div v-if="isOpen" class="icon">
        <img src="./assets/arrow-down.svg" alt="open"/>
      </div>
      {{ subcategory.title }}
    </h4>
    <div class="subcategory-btns">
      <button class="category-btn">
        <img src="./assets/add.svg" alt="edit" />
      </button>
      <button class="category-btn">
        <img src="./assets/edit.svg" alt="edit" />
      </button>
      <button class="category-btn" @click="store.deleteNode(subcategory.id)">
        <img src="./assets/delete.svg" alt="delete" />
      </button>
    </div>
  </div>
  
  <!-- <form v-if="showEditForm" class="category-edit_form" @submit.prevent="editCategory">
    <input type="text" placeholder="new category title" v-model="input_category" />
    <input type="submit" value="edit" :disabled="isInvalidInput('editcategory')" />
  </form> -->
</template>

<style scoped>
.subcategory-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 21px;
  cursor: pointer;
}

.subcategory-title {
  display: flex;
  flex-direction: row;
}

.subcategory-btns {
  display: none;
  flex-direction: row;
  gap: 4px;
}

.subcategory-wrapper:hover .subcategory-btns {
  display: flex;
}

.subcategory-title {
  text-decoration: none;
  overflow:hidden;
  white-space: nowrap; 
  text-align: start;
  width: 250px;
  -webkit-mask-image: linear-gradient(90deg, var(--dark-gray) 60%, transparent);
}

.icon img {
  width: 21px;
  heigth: 21px;
}
</style>