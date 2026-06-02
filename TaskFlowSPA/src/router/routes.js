import { renderLogin, setupLogin } from "../views/auth/login";
import { renderNotFound } from "../views/auth/not-found";
import { renderRegister, setupRegister } from "../views/auth/register";
import { renderHome } from "../views/home";
import { renderTaskForm, setupTaskForm } from "../views/tasks/task-form";
import { rendertasks, setupTasks } from "../views/tasks/tasks";
import { renderadmin } from "../views/admin/admin";
import { renderDashboard, setupDashboard } from "../views/app/dashboard";
import { renderProfile } from "../views/users/profile";

export const routes = {
    "/": {
        render: renderHome,
        isPublic: true
    },
    "/login": {
        render: renderLogin,
        setup: setupLogin,
        onlyGuests: true,
        isAuthorized: false
    },
    "/register": {
        render: renderRegister,
        setup: setupRegister,
        onlyGuests: true,
        isAuthorized: false
    },
    "/task-form": {
        render: renderTaskForm,
        setup: setupTaskForm,
        isAuthorized: false
    },
    "/tasks": {
        render: rendertasks,
        setup: setupTasks,
        isAuthorized: true
    },
    "/admin": {
        render: renderadmin,
        isAuthorized: true,
        allowRoles: ["ADMIN"]
    },
    "/dashboard": {
        render: renderDashboard,
        setup: setupDashboard,
        isAuthorized: true
    },
    "/profile": {
        render: renderProfile,
        isAuthorized: false
    },
}

export const notFoundView = renderNotFound