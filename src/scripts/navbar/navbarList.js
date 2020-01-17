const eventHub = document.querySelector(".container")
const messagesEventHub = document.querySelector(".appContainer")
const contentElement = document.querySelector(".navbar")

export const NavbarEventListener = () => {

  eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "logOut") {
      sessionStorage.clear();
      window.location.replace("index.html");
    }

  })

}

// export const MessagesNavbarEventListener = () => {
//   messagesEventHub.addEventListener("click", clickEvent => {
//     if(clickEvent.target.id === "logOut") {
//       sessionStorage.clear();
//       window.location.replace("index.html");
//     }

//   })
// }
