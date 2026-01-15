<script setup lang="ts">
import { ref, computed } from 'vue'

/** Domain type */
interface AppInfo {
  name: string
  createdAt: Date
}

/** Typed state */
const appInfo = ref<AppInfo>({
  name: 'Learning pinia',
  createdAt: new Date(),
})

/** Typed helper */
function formatAppName(test_app: AppInfo): string {
  return test_app.name.toUpperCase()
}

/** Typed computed */
const appNameLength = computed<number>(() => appInfo.value.name.length)

const formattedName = computed<string>(() => formatAppName(appInfo.value))
</script>

<template>
  <h1>You did it!</h1>

  <p>{{ appInfo.name }}</p>
  <p>Length: {{ appNameLength }}</p>
  <p>Formatted: {{ formattedName }}</p>
</template>

<style scoped></style>
