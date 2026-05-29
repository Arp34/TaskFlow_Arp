import { notFoundView, routes } from "./routes";

export function renderRoute(){
    const app = document.getElementById("app");

    if (!app) {
        console.error("App element not found");
        return;
    }
    
    const path = window.location.pathname;
    const route = routes[path] ?? {render: notFoundView};
    
    app.innerHTML = route.render();

    if (route.setup) {
        route.setup();
    }   
}

export function initRouter(){
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
        window.history.pushState(null, null, href);
        renderRoute();
    });
    
    window.addEventListener("popstate", renderRoute);
    renderRoute();
}