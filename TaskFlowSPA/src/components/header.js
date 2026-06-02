import { getSession, logout } from "../services/users.service";

export function renderHeader() {

    const session = getSession();

    return `
    <header class="border-b border-blue-100 bg-white/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <a class="text-xl font-black text-blue-900" href="/">
          TaskFlowSPA
        </a>

        <nav class="hidden gap-3 md:flex">

          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50"
            href="/dashboard">
            Dashboard
          </a>

          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50"
            href="/tasks">
            Tareas
          </a>

          <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50"
            href="/profile">
            Perfil
          </a>
            ${Array.isArray(session?.role)
            ? (session.role.includes("ADMIN")
                ? `
                    <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50"
                    href="/admin">
                    Admin
                    </a>
                `
                : "")
            : session?.role === "ADMIN"
                ? `
                <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50"
                    href="/admin">
                    Admin
                </a>
                `
                : ""
            }

          <button
            id="logout-btn"
            type="button"
            class="rounded-full px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
            Logout
          </button>

        </nav>

      </div>
    </header>
    `;
}

export function setupHeader() {

    const logoutBtn =
        document.getElementById("logout-btn");

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logout
        );
    }
}