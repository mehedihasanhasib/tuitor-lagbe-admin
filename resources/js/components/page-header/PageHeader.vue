<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="cn(
      'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
      props.class
    )"
  >
    <slot />
  </div>
</template>