<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/AppLayout.vue";
import { Plus } from "lucide-vue-next";
</script>

<template>
    <AppLayout>
        <div class="flex items-center gap-2">
            <Input placeholder="Enter text here" />
            <Button>
                <Plus />
                Item
            </Button>
        </div>
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Header 1</TableHeader>
                    </TableRow>
                </TableHead>
            </Table>
        </div>
    </AppLayout>
</template>
