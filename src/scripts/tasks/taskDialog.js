export const TaskDialog = () => {
  const eventHub = document.querySelector(".container");

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("editTask--")) {
      const dialogElement = document.querySelector(
        `#${clickEvent.target.id} + dialog`
      );
      dialogElement.showModal();
    }
  });

  eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("closeDialog--")) {
      const dialogElement = clickEvent.target.parentNode;
      dialogElement.close();
    }
  });
};
