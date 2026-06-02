import { getTaskById, getTaskFormData, saveTask, updateTask } from "../../services/tasks.service"
import { getSession } from "../../services/users.service";

export function renderTaskForm() {
  return `
<header class="border-b border-blue-100 bg-white/90 backdrop-blur">
  <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
    <a class="text-xl font-black text-blue-900" href="/">TaskFlowSPA</a>
    <nav class="hidden gap-3 md:flex">
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
        href="/dashboard">Dashboard</a>
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
        href="/tasks">Tareas</a>
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700"
        href="/profile">Perfil</a>
    </nav>
  </div>
</header>

<main class="mx-auto max-w-5xl px-6 py-10">
  <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Formulario</p>
    <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-900">Crear o editar tarea</h1>
    <p class="mt-4 max-w-2xl text-slate-600">Vista base para registrar una tarea nueva o actualizar una existente.</p>

    <form id="task-form" class="mt-8 grid gap-5">
      <div>
        <label class="mb-2 block text-sm font-medium text-slate-700" for="title">Titulo</label>
        <input id="title" type="text" placeholder="Ej. Preparar proyecto final"
          class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium text-slate-700" for="description">Descripcion</label>
        <textarea id="description" rows="5" placeholder="Describe la tarea..."
          class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"></textarea>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="status">Estado</label>
          <select id="status"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
            <option>Pendiente</option>
            <option>En progreso</option>
            <option>Completada</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="date">Fecha limite</label>
          <input id="date" type="date"
            class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
        </div>
      </div>

      <div class="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500">
          Guardar tarea
        </button>
        <a class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
          href="/tasks">Cancelar</a>
      </div>
    </form>
  </section>
</main>
`
}


export async function setupTaskForm() {

  const taskId = await loadTaskForEdit();

  console.log("ID EN SETUP:", taskId);


  const form = document.getElementById("task-form");

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    try {
      const taskData =  getTaskFormData();
      
      if (
        !taskData.title ||
        !taskData.description ||
        !taskData.date
      ){
      alert("Todos los campos son obligatorios");
      return;
    }

      if (taskId) {

      console.log("ACTUALIZANDO");


      await updateTask(taskId, taskData);
      alert("Tarea actualizada");

      } else {

      console.log("CREANDO");

      await saveTask(taskData);
      alert("Tarea creada");
      }

      window.history.pushState(null, null, "/tasks");
      window.dispatchEvent(  new PopStateEvent("popstate"));
    } 
    catch (error) {
      console.error(error);
      alert("Error al crear tarea");
    }
});}

export async function loadTaskForEdit() {

  const params = new URLSearchParams(window.location.search);

  const taskId = params.get("id");

  if (!taskId) {
    return null;
  }

  const task = await getTaskById(taskId);

  const session = getSession();

  if (
    session.role !== "ADMIN" &&
    task.userId !== session.id
  ) {
    alert("No tienes permisos");

    window.history.pushState(null, null, "/tasks");
    window.dispatchEvent(
      new PopStateEvent("popstate")
    );

    return null;
  }

  document.getElementById("title").value = task.title;

  document.getElementById("description").value = task.description;

  document.getElementById("status").value = task.status;

  document.getElementById("date").value = task.date;

  return taskId;
}