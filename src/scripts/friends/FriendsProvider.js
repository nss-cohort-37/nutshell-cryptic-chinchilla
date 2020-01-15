let friends = []

export const useFriends = () => friends.slice()
  
export const getfriends = () => fetch("http://localhost:3000/friends")
    .then(res => res.json())
    .then(parsedFriends => friends = parsedFriends)

    //ADD 
export const SaveFriends = friend => {
  return  fetch("http://localhost:3000/friends", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(friend)
  })
  .then(getfriends)
}

    //Delete

export const deleteFriends = friendId => {
  return fetch(`http://localhost:3000/friends/${friendId}`, {
      method: "DELETE"
  })
      .then(getfriends)