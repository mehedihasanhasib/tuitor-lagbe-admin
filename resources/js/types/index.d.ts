import { UserRole } from '@/enums/UserRole';
import { InertiaLinkProps } from '@inertiajs/vue3';
import type { LucideIcon } from 'lucide-vue-next';
import { Balance } from './balance';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon;
    activePath: string;
    show: boolean;
    items?: NavItem[];
}

export type AppPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    message: {
        success: string;
        error: string;
    };
    path: string;
    location: string;
    query: { [key: string]: string };
    csrfToken: string;
};

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: UserRole;
}

export type BreadcrumbItemType = BreadcrumbItem;

export interface QueryParam {
    [key: string]: string | number | boolean | null;
}