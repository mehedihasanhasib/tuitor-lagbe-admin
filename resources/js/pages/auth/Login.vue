<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { useForm } from "@inertiajs/vue3";

const loginForm = useForm({
    email: "",
    password: "",
});

const submit = () => {
    loginForm.post("/login");
};
</script>

<template>
    <AuthLayout>
        <form @submit.prevent="submit" class="flex flex-col gap-6">
            <FieldGroup>
                <div class="flex flex-col items-center gap-1 text-center">
                    <h1 class="text-2xl font-bold">Login to your account</h1>
                    <p class="text-muted-foreground text-sm text-balance">
                        Enter your email below to login to your account
                    </p>
                </div>
                <Field>
                    <FieldLabel for="email"> Email </FieldLabel>
                    <Input
                        v-model="loginForm.email"
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                    <FieldError v-if="loginForm.errors.email">{{
                        loginForm.errors.email
                    }}</FieldError>
                </Field>
                <Field>
                    <div class="flex items-center">
                        <FieldLabel for="password"> Password </FieldLabel>
                        <a
                            href="#"
                            class="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        v-model="loginForm.password"
                        id="password"
                        type="password"
                        required
                    />
                </Field>
                <Field>
                    <Button type="submit"> Login </Button>
                </Field>
            </FieldGroup>
        </form>
    </AuthLayout>
</template>
