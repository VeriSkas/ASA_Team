import { getSubtask } from "../api/api-handlers"

export const subtaskOfTask = async id => {
    return getSubtask()
        .then(subtasks => {
            if(subtasks) {
                const subtasksOfThisTask = subtasks.filter(task => task.idTodo === id);

                return subtasksOfThisTask;
            }
        })
}
