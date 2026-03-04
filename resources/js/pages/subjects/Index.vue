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
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import DropdownMenuContent from "@/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuItem from "@/components/ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenuTrigger from "@/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/composables/useModal";
import AppLayout from "@/layouts/AppLayout.vue";
import { PaginatedData } from "@/types/paginated-data";
import { Subject } from "@/types/subject";
import { router, useForm, usePage } from "@inertiajs/vue3";
import { Edit, MoreHorizontal, Trash2 } from "lucide-vue-next";
import { ref, watch } from "vue";
import { toast } from "vue-sonner";

interface Props {
    subjects: PaginatedData<Subject>;
}
type Mode = "create" | "edit";

const { subjects } = defineProps<Props>();
const mode = ref<Mode>("create");
const selectedSubject = ref<Subject>();
const deleteSubjectModal = useModal<Subject>();

const subjectForm = useForm({
    name: "",
    slug: "",
});

const save = () => {
    subjectForm.post("/subjects", {
        onSuccess: () => {
            subjectForm.reset("name", "slug");
        },
    });
};

const update = () => {
    if (!selectedSubject.value) {
        toast.error("Subject not found");
        return;
    }
    subjectForm.put(`/subjects/${selectedSubject.value.id}`, {
        onSuccess: () => {
            mode.value = "create";
            subjectForm.reset("name", "slug");
        },
    });
};

const deleteSubject = () => {
    if (!deleteSubjectModal.payload.value) {
        toast.error("Subject not found");
        return;
    }

    router.delete(`/subjects/${deleteSubjectModal.payload.value?.id}`, {
        onStart: () => {
            deleteSubjectModal.processing.value = true;
        },
        onSuccess: () => {
            deleteSubjectModal.close();
        },
        onFinish: () => {
            deleteSubjectModal.processing.value = false;
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

const editSubject = (subject: Subject) => {
    mode.value = "edit";
    selectedSubject.value = subject;
    subjectForm.name = subject.name;
    subjectForm.slug = subject.slug;
};

const cancelEdit = () => {
    mode.value = "create";
    selectedSubject.value = undefined;
    subjectForm.reset("name", "slug");
};
</script>

<template>
    <AppLayout>
        <div class="grid grid-cols-12 gap-3">
            <Card class="col-span-4">
                <CardHeader>
                    <h1 class="text-xl font-bold">
                        {{
                            mode === "create"
                                ? "Add New Subject"
                                : "Edit Subject"
                        }}
                    </h1>
                </CardHeader>
                <CardContent>
                    <form
                        @submit.prevent="mode === 'create' ? save() : update()"
                    >
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
                                <div
                                    class="flex items-center justify-end gap-2"
                                >
                                    <Button
                                        v-if="mode === 'edit'"
                                        type="button"
                                        variant="destructive"
                                        :disabled="subjectForm.processing"
                                        @click="cancelEdit()"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        :disabled="subjectForm.processing"
                                    >
                                        <Spinner
                                            v-if="subjectForm.processing"
                                        />
                                        <span v-else>{{
                                            mode === "create"
                                                ? "Save"
                                                : "Update"
                                        }}</span>
                                    </Button>
                                </div>
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
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal
                                                    class="h-4 w-4"
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            side="left"
                                            align="start"
                                        >
                                            <DropdownMenuItem
                                                @click="editSubject(subject)"
                                            >
                                                <Edit />
                                                Edit
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                @click="
                                                    deleteSubjectModal.open(
                                                        subject,
                                                    )
                                                "
                                                class="text-destructive focus:text-destructive"
                                            >
                                                <Trash2 />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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

        <Dialog
            :open="deleteSubjectModal.isOpen.value"
            @update:open="deleteSubjectModal.close()"
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        You want to delete
                        <span class="text-destructive">
                            {{ deleteSubjectModal.payload.value?.name }}?
                        </span>
                    </DialogTitle>
                    <DialogDescription>
                        You won't be able to recover this.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        @click="deleteSubject"
                        variant="destructive"
                        :disabled="deleteSubjectModal.processing.value"
                    >
                        <Spinner v-if="deleteSubjectModal.processing.value" />
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </AppLayout>
</template>
