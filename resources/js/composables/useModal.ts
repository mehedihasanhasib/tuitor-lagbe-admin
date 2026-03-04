import { ref } from "vue";

export function useModal<T>() {
    const isOpen = ref<boolean>(false);
    const payload = ref<T | undefined>();
    const processing = ref<boolean>(false);

    // methods
    const open = (data: T) => {
        payload.value = data;
        isOpen.value = true;
    };

    const close = () => {
        isOpen.value = false;
        payload.value = undefined;
    };

    return {
        isOpen,
        payload,
        processing,
        open,
        close,
    };
}
