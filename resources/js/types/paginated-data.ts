export interface PaginatedData<T> {
    data: T[];
    links: PaginationLinks;
    meta: PaginationMeta;
}

export interface PaginationLinks {
    first: string;
    last: string;
    prev: string;
    next: string;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        page: string | null;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}
