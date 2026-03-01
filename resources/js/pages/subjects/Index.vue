<script setup lang="ts">
import FlashMessage from "@/components/FlashMessage.vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppLayout from "@/layouts/AppLayout.vue";
import { PaginatedData } from "@/types/paginated-data";
import { Subject } from "@/types/subject";
import { useForm } from "@inertiajs/vue3";
import { watch } from "vue";

interface Props {
    subjects: PaginatedData<Subject>;
}

const { subjects } = defineProps<Props>();

const subjectForm = useForm({
    name: "",
    slug: "",
});

const submit = () => {
    subjectForm.post("/subjects", {
        onSuccess: () => {
            subjectForm.reset("name", "slug");
        },
    });
};

watch(
    () => subjectForm.name,
    () => {
        subjectForm.slug = subjectForm.name
            ?.trim()
            .replace(/[^a-zA-Z0-9]/g, "-")
            .toLowerCase();
    },
);
</script>

<template>
    <AppLayout>
        <div class="grid grid-cols-12 gap-3">
            <Card class="col-span-4">
                <CardHeader>
                    <h1 class="text-xl font-bold">Add New Subject</h1>
                    <FlashMessage
                        v-if="$page.props.message?.success"
                        :message="$page.props.message.success"
                        type="success"
                    />
                    <FlashMessage
                        v-if="$page.props.message?.error"
                        :message="$page.props.message.error"
                        type="error"
                    />
                </CardHeader>
                <CardContent>
                    <form @submit.prevent="submit">
                        <FieldGroup>
                            <Field>
                                <FieldLabel for="name"> Name </FieldLabel>
                                <Input
                                    v-model="subjectForm.name"
                                    id="name"
                                    type="text"
                                    placeholder="Enter subject name"
                                    required
                                />
                                <FieldError v-if="subjectForm.errors.name">
                                    {{ subjectForm.errors.name }}
                                </FieldError>
                            </Field>
                            <Field>
                                <FieldLabel for="slug"> Slug </FieldLabel>
                                <Input
                                    v-model="subjectForm.slug"
                                    id="slug"
                                    type="text"
                                    placeholder="Enter subject slug"
                                    required
                                />
                                <FieldError v-if="subjectForm.errors.slug">
                                    {{ subjectForm.errors.slug }}
                                </FieldError>
                            </Field>
                            <Field>
                                <Button
                                    type="submit"
                                    :disabled="subjectForm.processing"
                                >
                                    <Spinner v-if="subjectForm.processing" />
                                    <span v-else>Save</span>
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            <Card class="col-span-8">
                <CardHeader>
                    <h1 class="text-xl font-bold">Subjects List</h1>
                </CardHeader>
                <CardContent class="space-y-2">
                    <div>
                        <Input
                            id="search"
                            type="text"
                            placeholder="Search subject"
                            required
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow
                                v-for="subject in subjects.data"
                                :key="'subject' + subject.id"
                            >
                                <TableCell>
                                    {{ subject.name }}
                                </TableCell>
                                <TableCell>
                                    {{ subject.slug }}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <PaginationLinks
                        :links="subjects.links"
                        :meta="subjects.meta"
                    />
                </CardFooter>
            </Card>
        </div>
    </AppLayout>
</template>
