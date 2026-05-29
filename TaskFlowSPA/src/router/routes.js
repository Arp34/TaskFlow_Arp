import { renderLogin } from "../views/auth/login";
import { renderNotFound } from "../views/auth/not-found";
import { renderRegister, setupRegister } from "../views/auth/register";
import { renderHome } from "../views/home";
import { renderTaskForm } from "../views/tasks/task-form";
import { rendertasks } from "../views/tasks/tasks";
import { renderadmin } from "../views/admin/admin";
import { renderDashboard } from "../views/app/dashboard";
import { renderProfile } from "../views/users/profile";

export const routes = {
    "/": {
        render: renderHome,
        isPublic: true
    },
    "/login": {
        render: renderLogin,
        isAuthorized: false
    },
    "/register": {
        render: renderRegister,
        setup: setupRegister,
        isAuthorized: false
    },
    "/task-form": {
        render: renderTaskForm,
        isAuthorized: false
    },
    "/tasks": {
        render: rendertasks,
        isAuthorized: true
    },
    "/admin": {
        render: renderadmin,
        isAuthorized: true,
        allowRoles: ["ADMIN"]
    },
    "/dashboard": {
        render: renderDashboard,
        isAuthorized: true
    },
    "/profile": {
        render: renderProfile,
        isAuthorized: false
    },
}

export const notFoundView = renderNotFound