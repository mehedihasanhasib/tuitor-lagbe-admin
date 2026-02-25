<script setup lang="ts">
import {
    PageDescription,
    PageHeader,
    PageHeaderLeft,
    PageHeaderRight,
    PageTitle,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/AppLayout.vue";
</script>

<template>
    <AppLayout>
        <PageHeader>
            <PageHeaderLeft>
                <PageTitle>Users</PageTitle>
                <PageDescription>Manage all users here</PageDescription>
            </PageHeaderLeft>

            <PageHeaderRight>
                <Button>Add User</Button>
            </PageHeaderRight>
        </PageHeader>
    </AppLayout>
</template>
