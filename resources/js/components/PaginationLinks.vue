<script setup lang="ts">
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationLinks, PaginationMeta } from "@/types/paginated-data";
import { Link, usePage } from "@inertiajs/vue3";
import { computed } from "vue";

interface Props {
    links: PaginationLinks;
    meta: PaginationMeta;
}
defineProps<Props>();
const propsOnly = computed(() => {
    const path = usePage().props.path;

    const props = {
        "admin/users": ["users"],
        tuitions: ["tuitions"],
    };

    return props[path as keyof typeof props] || [];
});
</script>

<template>
    <Pagination
        v-slot="{ page }"
        :items-per-page="meta.per_page"
        :total="meta.total"
        :default-page="meta.current_page"
    >
        <PaginationContent v-slot="{ items }">
            <Link
                :href="`/${$page.props.path}`"
                :data="{ ...$page.props.query, page: 1 }"
                :only="propsOnly"
            >
                <PaginationFirst />
            </Link>
            <Link
                :href="`/${$page.props.path}`"
                :data="{ ...$page.props.query, page: meta.current_page - 1 }"
                :only="propsOnly"
            >
                <PaginationPrevious />
            </Link>

            <template v-for="(item, index) in items" :key="index">
                <Link
                    :href="`/${$page.props.path}`"
                    :data="{ ...$page.props.query, page: item.value }"
                    :only="propsOnly"
                >
                    <PaginationItem
                        v-if="item.type === 'page'"
                        :value="item.value"
                        :is-active="item.value === page"
                    >
                        {{ item.value }}
                    </PaginationItem>
                </Link>
            </template>

            <PaginationEllipsis :index="4" />

            <Link
                :href="`/${$page.props.path}`"
                :data="{ ...$page.props.query, page: meta.current_page + 1 }"
                :only="propsOnly"
            >
                <PaginationNext />
            </Link>

            <Link
                :href="`/${$page.props.path}`"
                :data="{ ...$page.props.query, page: meta.last_page }"
                :only="propsOnly"
            >
                <PaginationLast />
            </Link>
        </PaginationContent>
    </Pagination>
</template>
