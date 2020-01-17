let friends = []

export const useFriends = () => friends.slice()

export const getFriends = () => fetch("http://localhost:3000/friends?_expand=user")
    .then(res => res.json())
    .then(paresedFriends => friends = paresedFriends)