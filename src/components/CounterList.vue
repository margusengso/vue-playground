<script setup lang="ts">
import { useItemsStore, type ItemId } from "@/stores/items";
import { ref, onMounted, shallowRef } from "vue";
import { useResizeObserver } from "@vueuse/core";

const loading = ref<boolean>(false);

const el = shallowRef<HTMLElement | null>(null);

useResizeObserver(el, (entries) => {
  const entry = entries[0];
  const { width, height } = entry?.contentRect;
  if (width) {
    console.log("VueUse dimensions: " + width + " : " + height);
  }
})


const addBtn = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  setTimeout(() => {
    addBtn.value?.focus();
  }, 2000)
});

const s = useItemsStore();

/*function add() {
  s.addItem();
}*/

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
      <li
        v-for="it in s.items"
        :key="it.id"
        class="rounded-xl p-4 shadow-sm ring-1 ring-black/5"
        :style="{ backgroundColor: it.color }"
      >
        <button
          type="button"
          class="flex w-full items-center justify-between text-left border-amber-500 border-2 rounded-lg p-2"
          @click="inc(it.id)"
        >
          <div class="flex flex-col">
            <span class="text-sm font-medium text-black/80">
              Item {{ it.id.slice(-6) }}
            </span>

            <span class="text-xs text-black/70">
              Adds +{{ it.step }} each click
              <span v-if="it.step !== 0">
                (last +{{ it.step }})
              </span>
            </span>
          </div>

          <div class="text-lg font-bold text-black/90">
            {{ it.sum }}
          </div>
        </button>

        <div class="mt-3 flex gap-2">
          <button
            type="button"
            class="rounded-lg bg-white/70 px-3 py-1 text-xs font-medium text-black/80 hover:bg-white/80"
            @click="resetItem(it.id)"
          >
            Reset
          </button>

          <button
            type="button"
            class="rounded-lg bg-white/70 px-3 py-1 text-xs font-medium text-black/80 hover:bg-white/80"
            @click="removeItem(it.id)"
          >
            Remove
          </button>
        </div>
      </li>
    </ul>

    <el-button
      type="success"
      class="mt-4"
      @click="add"
    >
      + Add item
    </el-button>

<!--    <button ref="addBtn" >AddTEST</button>

    <el-button type="success" style="margin-left: 6px;">El Plus</el-button>-->


    <p class="mt-2 text-sm text-slate-600">
      {{ s.items.length }} items
    </p>
    {{loading}}
  </div>
</template>
