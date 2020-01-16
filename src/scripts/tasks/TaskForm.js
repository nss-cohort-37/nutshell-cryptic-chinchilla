export const TaskForm = task => {
  return `
    <section class="taskFormCard">
      <fieldset>
        <form class="taskForm">
        <div class="taskFormInfo">
          Task: <input id="task-name" type="text" placeholder="Please enter task.....">
        </div>
        <div class="taskFormInfo">
          Completion Date: <input id="task-date" type="date">
        </div>
        </form>
        <button id="saveTask--${task.id}" class="saveTaskBtn">Save Task</button>
      </fieldset>
    </section>
  `;
};
