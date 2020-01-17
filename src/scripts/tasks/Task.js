export const TaskComponent = (users, tasks) => {
  return `
    <section class="taskCard">
      <div class="taskCardInfo">Name: ${users.userName}</div>
      <div class="taskCardInfo">To Do: ${tasks
        .map(
          task => `<ul>
          <li>${task.name}</li>
        </ul>`
        )
        .join("")}</div>
      <div class="taskCardInfo">Date: ${tasks
        .map(
          task => `<ul>
          <li>${task.completionDate}</li>
        </ul>`
        )
        .join("")}</div>
        
          <button id="editTask--${
            users.id
          }" class="editTask btn btn-secondary">Edit Task</button>
        <dialog>
        <input id="hidden-value" type="hidden">
          <div class="taskFormInfo">
            Task: <input id="task-name--${
              users.id
            }" class="task-name" type="text" placeholder="Please enter task.....">
          </div>
          <div class="taskFormInfo">
            Completion Date: <input id="task-date--${
              users.id
            }" class="task-date" type="date">
          </div>
          <button id="deleteTask--${
            users.id
          }" class="btn btn-secondary">Delete Task</button>
          <button id="saveTask--" class="saveTaskBtn btn btn-primary">Save Task</button>
          <button id="closeDialog--" class="closeBtn">Close</button>
          </dialog>
    </section>
  `;
};
