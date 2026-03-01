<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ref } from "vue";

const props = defineProps<{
    message: string;
    type: "success" | "error";
}>();

const flashMessage = ref(props.message);
const closeMessage = () => {
    flashMessage.value = "";
};
</script>

<template>
    <div
        v-if="type == 'success' && flashMessage"
        class="flex items-center justify-between gap-2 bg-green-300 px-4 py-2 rounded-md"
    >
        <p class="text-green-800">{{ flashMessage }}</p>
        <button @click="closeMessage" class="cursor-pointer">
            <X class="size-4 text-green-800" />
        </button>
    </div>

    <div
        v-if="type == 'error' && flashMessage"
        class="flex items-center justify-between gap-2 bg-red-300 px-4 py-2 rounded-md"
    >
        <p class="text-red-800">{{ flashMessage }}</p>
        <button @click="closeMessage" class="cursor-pointer">
            <X class="size-4 text-red-800" />
        </button>
    </div>
</template>
