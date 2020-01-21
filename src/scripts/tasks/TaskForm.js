export const TaskForm = () => {
  return `
  <section class="taskFormCard">
    <fieldset>
      <input id="hidden-value" type="hidden">
      <form class="taskForm">
        <div class="taskFormInfo">
          Task: <input id="task-name" class="form-control" type="text" placeholder="Please enter task.....">
        </div>
        <div class="taskFormInfo">
          Completion Date: <input id="task-date" class="form-control" type="date">
        </div>
      </form>
      <button id="saveTask--" class="btn btn-primary">Save Task</button>
    </fieldset>
  </section>
  `;
};
