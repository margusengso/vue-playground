import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export type ItemId = string;

export interface ListItem {
  id: ItemId;
  color: string;
  sum: number;
  step: number;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColorRgb(): string {
  const r = randomInt(20, 220);
  const g = randomInt(20, 220);
  const b = randomInt(20, 220);
  return `rgb(${r}, ${g}, ${b})`;
}

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function createItem(id: ItemId): ListItem {
  // wrap with reactive at insertion time (see below)
  return {
    id,
    color: randomColorRgb(),
    sum: 0,
    step: randomInt(1, 10),
  };
}

export const useItemsStore = defineStore("items", () => {
  const order = ref<ItemId[]>([]);
  const itemsById = reactive(new Map<ItemId, ListItem>());

  function ensure(id: ItemId) {
    if (!itemsById.has(id)) {
      // IMPORTANT: make the value reactive
      itemsById.set(id, reactive(createItem(id)) as ListItem);
      order.value.push(id);
    }
  }

  function addItem(): ItemId {
    const id = makeId();
    itemsById.set(id, reactive(createItem(id)) as ListItem);
    order.value.push(id);
    return id;
  }

  function inc(id: ItemId): number {
    ensure(id);
    const item = itemsById.get(id);
    if (!item) return 0;

    item.sum += item.step;
    return item.step;
  }

  function reset(id: ItemId, to = 0) {
    ensure(id);
    const item = itemsById.get(id);
    if (!item) return;
    item.sum = to;
  }

  function remove(id: ItemId) {
    if (!itemsById.has(id)) return;
    itemsById.delete(id);
    order.value = order.value.filter((x) => x !== id);
  }

  const items = computed<ListItem[]>(() =>
    order.value
      .map((id) => itemsById.get(id))
      .filter((x): x is ListItem => x !== undefined)
  );

  const total = computed(() => items.value.reduce((acc, it) => acc + it.sum, 0));

  return { items, total, addItem, inc, reset, remove };
});
