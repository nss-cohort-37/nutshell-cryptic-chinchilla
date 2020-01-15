export const TaskComponent = task => {
  return `
    <section class="taskCard">
      <div class="taskCardInfo">Name: ${task.name}</div>
      <div class="taskCardInfo">Date: ${task.completionDate}</div>
    </section>
  `;
};
