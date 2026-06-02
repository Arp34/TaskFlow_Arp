import { renderHeader } from "../../components/header";
import { deleteTask, getVisibleTasks } from "../../services/tasks.service";
import { obtenerUsuarios } from "../../services/users.service";

export function rendertasks() {
  return `
${renderHeader()}

<main class="mx-auto max-w-6xl px-6 py-10">
  <section
    class="flex flex-col gap-4 rounded-[2rem] bg-blue-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">CRUD de tareas</p>
      <h1 class="mt-3 text-4xl font-black tracking-tight">Mis tareas</h1>
      <p class="mt-4 max-w-2xl text-blue-50">
        Vista principal para listar, editar y eliminar las tareas del usuario autenticado.
      </p>
    </div>

    <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
      href="/task-form">
      Crear tarea
    </a>
  </section>

  <!-- Aquí se renderizarán las tareas dinámicamente -->
  <section id="tasks-container" class="mt-8 grid gap-4">
  </section>
</main>
`;
}

export async function setupTasks() {

  const container = document.getElementById("tasks-container");

  const tasks = await getVisibleTasks();

  if (tasks.length === 0) {
  container.innerHTML = `
    <p class="text-center text-slate-500">
      No hay tareas disponibles.
    </p>
  `;
  return;
}

  const users = await obtenerUsuarios();

  container.innerHTML = tasks.map(task => {

    const owner = users.find(
      user => user.id === task.userId
    );

    return `
      <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">

        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

          <div>

            <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
              ${task.status}
            </p>

            <h2 class="mt-2 text-2xl font-bold text-slate-900">
              ${task.title}
            </h2>

            <p class="mt-3 max-w-2xl text-slate-600">
              ${task.description}
            </p>

            <p class="mt-2 text-sm text-slate-500">
              ${task.date}
            </p>

            <p class="mt-2 text-sm text-slate-500">
              Usuario: ${owner?.name || "Desconocido"}
            </p>

          </div>

          <div class="flex gap-3">

            <button
              data-id="${task.id}"
              class="edit-btn rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              Editar
            </button>

            <button
              data-id="${task.id}"
              class="delete-btn rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              Eliminar
            </button>

          </div>

        </div>

      </article>
    `;
  }).join("");

  document.querySelectorAll(".edit-btn").forEach(button => {
    
    button.addEventListener("click", () => {
    
      const taskId = button.dataset.id;
    
      window.history.pushState(null, null, `/task-form?id=${taskId}`);
    
      window.dispatchEvent(new PopStateEvent("popstate"));

    });
  });
  
  document.querySelectorAll(".delete-btn").forEach(button => {

  button.addEventListener("click", async () => {

    const taskId = button.dataset.id;

    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta tarea?");

    if (!confirmDelete) {
      return;
    }
    try {

      await deleteTask(taskId);
      alert("Tarea eliminada");
      window.history.pushState(null, null, "/tasks");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } 
    
    catch (error) {
      console.error(error);
      alert("Error al eliminar tarea");
      }
    });
  });

}


