import { getSession } from "../services/users.service";
import { notFoundView, routes } from "./routes";

export async function renderRoute() {

    const session = getSession();

    const app = document.getElementById("app");

    if (!app) {
        console.error("App element not found");
        return;
    }

    const path = window.location.pathname;

    const route = routes[path] ?? {
        render: notFoundView
    };

    // ==========================
    // RUTAS SOLO PARA INVITADOS
    // ==========================
    // Si ya inició sesión,
    // no puede entrar a login o register

    if (route.onlyGuests && session) {

        window.history.pushState(null, null, "/dashboard");

        renderRoute();

        return;
    }

    // ==========================
    // RUTAS PROTEGIDAS
    // ==========================
    // Si requiere autenticación
    // y no hay sesión

    if (route.isAuthorized && !session) {

        window.history.pushState(null, null, "/login");

        renderRoute();

        return;
    }

    // ==========================
    // VALIDACIÓN DE ROLES
    // ==========================
    // Si la ruta requiere ciertos roles

    if (route.allowRoles) {

        const hasPermission = route.allowRoles.some(role =>
            session?.role?.includes(role)
        );

        if (!hasPermission) {

            window.history.pushState(null, null, "/dashboard");

            renderRoute();

            return;
        }
    }

    app.innerHTML = route.render();

    if (route.setup) {
        await route.setup();
    }
}

export function initRouter() {

    document.addEventListener("click", (event) => {

        const link = event.target.closest("a");

        if (!link) {
            return;
        }

        const href = link.getAttribute("href");

        if (!href || !href.startsWith("/")) {
            return;
        }

        event.preventDefault();

        window.history.pushState(
            null,
            null,
            href
        );

        renderRoute();
    });

    window.addEventListener(
        "popstate",
        renderRoute
    );

    renderRoute();
}