<script setup lang="ts">
import { useItemsStore, type ItemId } from "@/stores/items";
import { ref, onMounted, shallowRef } from "vue";
import { useResizeObserver } from "@vueuse/core";

import ItemsListItem from "@/components/ItemsListItem.vue";

const loading = ref<boolean>(false);

const el = shallowRef<HTMLElement | null>(null);

useResizeObserver(el, (entries) => {
  const entry = entries[0];
  const { width, height } = entry?.contentRect;
  if (width) {
    console.log("VueUse dimensions: " + width + " : " + height);
  }
});

const addBtn = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  setTimeout(() => {
    addBtn.value?.focus();
  }, 2000);
});


const s = useItemsStore();

function add() {
  loading.value = true;
  setTimeout(() => {
    s.addItem();
    loading.value = false;
  }, 800);
}

function inc(id: ItemId) {
  s.inc(id);
}

function resetItem(id: ItemId) {
  s.reset(id);
}

function removeItem(id: ItemId) {
  s.remove(id);
}
</script>

<template>
  <div class="mx-auto max-w-xl p-4" ref="el">
    <div class="mb-3 flex items-baseline justify-between flex-col">
      <p class="text-[50px] text-blue-400 italic">Items</p>

      <div class="text-sm text-slate-600">
        Total:
        <span class="font-semibold text-slate-900">{{ s.total }}</span>
      </div>
    </div>

    <ul class="flex flex-col gap-3">
      <ItemsListItem
        v-for="it in s.items"
        :key="it.id"
        :it="it"
        @inc="inc"
        @reset="resetItem"
        @remove="removeItem"
      />
    </ul>

    <el-button type="success" class="mt-4" @click="add">
      + Add item
    </el-button>

    <p class="mt-2 text-sm text-slate-600">
      {{ s.items.length }} items
    </p>
    {{ loading }}
  </div>
</template>
