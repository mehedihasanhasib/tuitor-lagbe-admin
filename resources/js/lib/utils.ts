import { useFilter } from "@/composables/useFilter";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function debounce(
    fn: (...args: Record<string, unknown>[]) => void,
    delay: number = 500,
) {
    let timer: number | undefined;
    return (...args: Record<string, unknown>[]) => {
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

export const debounceSearch = debounce(
    (queryParams: Record<string, unknown>) => {
        useFilter().filter(queryParams);
    },
);
