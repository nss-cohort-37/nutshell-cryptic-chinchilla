export const TaskComponent = (users, tasks) => {
  return `
    <section class="taskCard">
      <div class="taskCardInfo">Name: ${users.username}</div>
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
        <button id="deleteTask--${
          users.id
        }" class="btn btn-secondary">Delete Task</button>
        <button id="editTask--${
          users.id
        }" class="btn btn-secondary">Edit Task</button>
    </section>
  `;
};