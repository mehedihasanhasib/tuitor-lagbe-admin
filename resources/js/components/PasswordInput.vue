<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ref } from "vue";

const model = defineModel<string>();
const showPassword = ref(false);
</script>

<template>
    <div class="relative">
        <Input
            v-model="model"
            :type="showPassword ? 'text' : 'password'"
            v-bind="$attrs"
        />
        <Button
            type="button"
            @click="showPassword = !showPassword"
            variant="ghost"
            size="sm"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-gray-100"
        >
            <EyeOff v-if="showPassword" class="h-4 w-4 text-gray-500" />
            <Eye v-else class="h-4 w-4 text-gray-500" />
        </Button>
    </div>
</template>
