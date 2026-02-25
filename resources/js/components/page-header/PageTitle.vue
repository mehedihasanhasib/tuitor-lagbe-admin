<!-- components/page-header/PageTitle.vue -->
<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "vue";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <h1
        :class="
            cn(
                'text-2xl md:text-3xl font-semibold tracking-tight text-foreground',
                props.class,
            )
        "
    >
        <slot />
    </h1>
</template>
