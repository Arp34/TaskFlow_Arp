import { renderHeader } from "../../components/header";
import { renderRoute } from "../../router/router";
import { deleteUser, getSession, obtenerUsuarios, updateUser } from "../../services/users.service";

export function renderadmin() {
  return `
${renderHeader()}


<main class="mx-auto max-w-7xl px-6 py-10">
  <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Rol administrador</p>
    <h1 class="mt-3 text-4xl font-black tracking-tight">Panel administrativo</h1>
    <p class="mt-4 max-w-2xl text-blue-50">Vista reservada para gestionar usuarios, roles, permisos y monitoreo general
      del sistema.</p>
  </section>

  <section class="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <h2 class="text-xl font-bold text-slate-900">Acciones rapidas</h2>
      <div class="mt-5 grid gap-4">
        <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100"
          href="/admin">Gestionar usuarios</a>
        <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100"
          href="/tasks">Ver todas las tareas</a>
        <a class="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 hover:bg-blue-100"
          href="/dashboard">Volver al dashboard</a>
      </div>
    </article>

    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">

      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900">
          Usuarios
        </h2>
      </div>

      <div id="users-container" class="mt-5 space-y-4">
      </div>

    </article>
  </section>
</main>
`
}

export async function setupAdmin() {

  const container =
    document.getElementById("users-container");

  const users =
    await obtenerUsuarios();

  container.innerHTML = users.map(user => `

    <div class="rounded-2xl bg-blue-50 p-4">

      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div>
          <p class="font-bold text-slate-900">
            ${user.name}
          </p>

          <p class="text-sm text-slate-500">
            ${user.email}
          </p>
        </div>

        <div class="flex gap-2">

          <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
            ${user.role}
          </span>

          <button
            data-id="${user.id}"
            data-role="${user.role}"
            class="change-role-btn rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white">
            Cambiar rol
          </button>

          <button
            data-id="${user.id}"
            class="delete-user-btn rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-white">
            Eliminar
          </button>

        </div>

      </div>

    </div>

  `).join("");
  document.querySelectorAll(".change-role-btn").forEach(button => {

  button.addEventListener("click", async () => {

    const id = button.dataset.id;

    const currentRole = button.dataset.role;

    const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

    const session = getSession();

    if (String(id) === String(session.id)) {
      alert("No puedes cambiar tu propio rol");
      return;
    }

    await updateUser(id, {role: newRole});

    alert("Rol actualizado");

    renderRoute();
  });

  });
  document.querySelectorAll(".delete-user-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;

      const confirmDelete = confirm("¿Eliminar usuario?");

      if (!confirmDelete) {
        return;
      }

      const session = getSession();

      if (String(id) === String(session.id)) {
        alert("No puedes eliminar tu propia cuenta");
        return;
      }

      await deleteUser(id);

      alert("Usuario eliminado");

      renderRoute();
    });

  });
}