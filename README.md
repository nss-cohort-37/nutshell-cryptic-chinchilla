# Nutshell: The Information Dashboard

## Setup: Follow these steps exactly

1. Clone this repository
1. `cd` into the directory it creates
1. `cd` into the `src` directory and `serve`/`hs`
1. In a separate terminal window, cd into the `api` directory
1. `json-server -p 3000 -w database.json`

## Instructions

Nutshell is a dashboard for Flat Earthers to use to organize their daily tasks, events, news article, friends, and chat messages.

## Features
1. Login/register as a new user
1. Add/remove friends
1. Add/edit/remove tasks
1. Add/edit/remove news
1. Add/edit/remove events
1. Send receive public messages and edit yours
1. Add friends from search or messages section
1. View news and events of friends/self in chronological order
1. Stay logged in on page refresh
1. Logout
1. Confirm password and username for security
1. Mark tasks as complete


## Sample Data
```
"news": [
    {
      "id": 1,
      "userId": 1,
      "title": "Wormholes Allow Information to Escape Black Holes",
      "synopsis": "Wormholes Allow Information to Escape Black Holes",
      "url": "https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/",
      "date": "1/17/2020"
    }
]
```
```
"events": [
    {
      "id": 5,
      "userId": 1,
      "name": "NASA Always Lies About Everything",
      "date": "Tue Feb 02 2021 12:00:00 GMT-0600 (Central Standard Time)",
      "location": "Ice Wall"
    }
]
```
```
 "tasks": [
    {
      "userId": 1,
      "name": "Ouestion everything",
      "completionDate": "2020-01-10",
      "id": 4,
      "isCompleted": true
    }
 ]
```
```
"messages": [
    {
      "id": 1,
      "message": "What's up?",
      "userId": 1
    }
]
```
```
"friends": [
    {
      "userId": 3,
      "friendInitiateId": 4,
      "active": true,
      "id": 12
    }
]
```
```
"users": [
    {
      "id": 1,
      "userName": "Steve",
      "email": "steve@me.com",
      "password": "123"
    }
]
```

## Authored by:
* James Nitz: https://github.com/jamesnitz
* Audrey Borgra: https://github.com/aborgra
* Onterio Wright: https://github.com/onteriowright
* William Green: https://github.com/wggreen