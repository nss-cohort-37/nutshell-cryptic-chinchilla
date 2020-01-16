export const TaskComponent = (users, tasks) => {
  return `
    <section class="taskCard">
      <div class="taskCardInfo">Name: ${users.username}</div>
      <div class="taskCardInfo">To Do: ${tasks.map(task => task.name)}</div>
      <div class="taskCardInfo">Date: ${tasks.map(
        task => task.completionDate
      )}</div>
    </section>
  `;
};
