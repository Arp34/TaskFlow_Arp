import { getVisibleTasks } from "./tasks.service";

export async function getDashboardData() {
    
    const tasks = await getVisibleTasks();

    const today = new Date()
        .toISOString()
        .split("T")[0];

    return {
        active: tasks.filter(
            task => task.status !== "Completada"
        ).length,

        completed: tasks.filter(
            task => task.status === "Completada"
        ).length,

        today: tasks.filter(
            task => task.date === today
        ).length
        
    };
    console.log(stats);
}