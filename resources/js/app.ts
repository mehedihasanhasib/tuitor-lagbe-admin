import "../css/app.css";

import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import type { DefineComponent } from "vue";
import { createApp, h } from "vue";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
declare global {
    interface String {
        headline(): string;
    }
}
if (!String.prototype.headline) {
    String.prototype.headline = function () {
        return this.replace(/[_-]+/g, " ") // Replace _ and - with spaces
            .replace(/\s+/g, " ") // Collapse multiple spaces
            .trim() // Trim whitespace
            .toLowerCase() // Lowercase everything
            .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize first letter of each word
    };
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>("./pages/**/*.vue"),
        ),
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .mount(el);
    },
    progress: {
        color: "#1CA04B",
    },
});
