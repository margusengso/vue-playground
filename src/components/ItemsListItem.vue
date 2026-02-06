<script setup lang="ts">
import type { ItemId, ListItem } from "@/stores/items";


const TRANSITIONS = [
  "el-fade-in-linear",
  "el-fade-in",
  "el-zoom-in-center",
  "el-zoom-in-top",
  "el-zoom-in-bottom",
  "el-zoom-in-left",
] as const;

function pickOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

const transitionName = pickOne(TRANSITIONS);

defineProps<{
  it: ListItem;
}>();

const emit = defineEmits<{
  (e: "inc", id: ItemId): void;
  (e: "reset", id: ItemId): void;
  (e: "remove", id: ItemId): void;
}>();
</script>

<template>
  <transition :name="transitionName" appear>
    <li
      class="rounded-xl p-4 shadow-sm ring-1 ring-black/5"
      :style="{ backgroundColor: it.color }"
    >
      <button
        type="button"
        class="flex w-full items-center justify-between text-left border-amber-500 border-2 rounded-lg p-2"
        @click="emit('inc', it.id)"
      >
        <div class="flex flex-col">
          <span class="text-sm font-medium text-black/80">
            Item {{ it.id.slice(-6) }}
          </span>

          <span class="text-xs text-black/70">
            Adds +{{ it.step }} each click
            <span v-if="it.step !== 0">(last +{{ it.step }})</span>
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
          @click="emit('reset', it.id)"
        >
          Reset
        </button>

        <button
          type="button"
          class="rounded-lg bg-white/70 px-3 py-1 text-xs font-medium text-black/80 hover:bg-white/80"
          @click="emit('remove', it.id)"
        >
          Remove
        </button>
      </div>
    </li>
  </transition>
</template>
