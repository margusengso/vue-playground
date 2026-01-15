<script setup lang="ts">
import { reactive } from "vue";
import { useItemsStore, type ItemId } from "@/stores/items";
import { ref, onMounted } from "vue";

const loading = ref<boolean>(false);


const addBtn = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  setTimeout(() => {
    addBtn.value?.focus();
  }, 2000)
});

const s = useItemsStore();

// UI-only state: always a number. 0 means "no last delta yet"
const lastDeltaById = reactive<Record<ItemId, number>>({});

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
  const delta = s.inc(id);
  lastDeltaById[id] = delta;
}

function lastDelta(id: ItemId): number {
  return lastDeltaById[id] ?? 0;
}

function resetItem(id: ItemId) {
  s.reset(id);
  lastDeltaById[id] = 0;
}

function removeItem(id: ItemId) {
  s.remove(id);
  delete lastDeltaById[id]; // optional cleanup
}
</script>

<template>
  <div class="mx-auto max-w-xl p-4">
    <div class="mb-3 flex items-baseline justify-between">
      <h1 class="text-xl font-semibold">Items</h1>
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
          class="flex w-full items-center justify-between text-left"
          @click="inc(it.id)"
        >
          <div class="flex flex-col">
            <span class="text-sm font-medium text-black/80">
              Item {{ it.id.slice(-6) }}
            </span>

            <span class="text-xs text-black/70">
              Adds +{{ it.step }} each click
              <span v-if="lastDelta(it.id) !== 0">
                (last +{{ lastDelta(it.id) }})
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

    <button
      type="button"
      class="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
      @click="add"
    >
      + Add item
    </button>

    <button ref="addBtn">AddTEST</button>

    <p class="mt-2 text-sm text-slate-600">
      {{ s.items.length }} items
    </p>
    {{loading}}
  </div>
</template>
