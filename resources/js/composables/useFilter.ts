import { router, usePage } from "@inertiajs/vue3";

export function useFilter() {
    const filter = (param: { [key: string]: any }) => {
        const page = usePage();

        const queryParams = { ...page.props.query, ...param };

        for (const key in queryParams) {
            if (
                key == "page" ||
                queryParams[key] == "" ||
                queryParams[key] == null
            ) {
                delete queryParams[key];
            }
        }

        router.get(
            `/${page.props.path}`,
            {
                ...queryParams,
            },
            {
                preserveScroll: true,
                preserveState: true,
                only: [
                    "tuitions",
                    "path",
                    "successMessage",
                    "errorMessage",
                    "query",
                ],
            },
        );
    };

    return { filter };
}
