import { renderHeader } from "../../components/header";
import { getDashboardData } from "../../services/app.service";
import { getSession } from "../../services/users.service";

export function renderDashboard() {
  return `
${renderHeader()}


<main class="mx-auto max-w-6xl px-6 py-10">
  <section class="rounded-[2rem] bg-blue-600 px-8 py-10 text-white shadow-xl shadow-blue-100">
    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Dashboard principal</p>
    <h1 id="dashboard-user" class="mt-3 text-4xl font-black tracking-tight">Bienvenid@</h1>
    <p class="mt-4 max-w-2xl text-blue-50">Resumen general del trabajo del usuario, accesos rapidos y estado actual de
      productividad.</p>
  </section>

  <section class="mt-8 grid gap-4 md:grid-cols-3">
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <p class="text-sm text-slate-500">Tareas activas</p>
      <p class="active-tasks mt-3 text-4xl font-black text-blue-700">0</p>
    </article>
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <p class="text-sm text-slate-500">Completadas</p>
      <p class="completed-tasks mt-3 text-4xl font-black text-blue-700">0</p>
    </article>
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <p class="text-sm text-slate-500">Pendientes hoy</p>
      <p class="today-tasks mt-3 text-4xl font-black text-blue-700">0</p>
    </article>
  </section>

  <section class="mt-8">
    <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-slate-900">Accesos rapidos</h2>
        <a class="text-sm font-semibold text-blue-700 hover:text-blue-600" href="/tasks">Ver tareas</a>
      </div>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/task-form">
          <p class="text-sm font-semibold text-blue-600">Crear</p>
          <h3 class="mt-2 text-lg font-bold text-slate-900">Nueva tarea</h3>
        </a>
        <a class="rounded-3xl bg-blue-50 p-5 hover:bg-blue-100" href="/profile">
          <p class="text-sm font-semibold text-blue-600">Cuenta</p>
          <h3 class="mt-2 text-lg font-bold text-slate-900">Editar perfil</h3>
        </a>
      </div>
    </article>
  </section>
</main>
`
}

export async function setupDashboard() {
  const session = getSession();
  
  document.getElementById("dashboard-user").textContent = `Bienvenido, ${session.name}`;

  const stats = await getDashboardData();
  document.querySelector(".active-tasks").textContent = String(stats.active);
  document.querySelector(".completed-tasks").textContent = String(stats.completed);
  document.querySelector(".today-tasks").textContent = String(stats.today);
}