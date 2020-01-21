let events = [];

export const useEvents = () => events.slice();

export const getEvents = () => {
  return fetch("http://localhost:3000/events")
    .then(res => res.json())
    .then(parsedEvents => events = parsedEvents);
};

export const saveEvent = event => {
  return fetch("http://localhost:3000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  }).then(getEvents);
};

export const deleteEvent = eventId => {
  return fetch(`http://localhost:3000/events/${eventId}`, {
    method: "DELETE"
  }).then(getEvents);
};

export const editEvent = event => {
  return fetch(`http://localhost:3000/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  }).then(getEvents);
};
