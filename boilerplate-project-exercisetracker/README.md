# [Exercise Tracker - Updated](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

NOTES
---
Additional modules required:
- mongodb/mongoose: database storage
- body-parser: parsing fetched logs

Edits to [/views/index.html](#views/index.html) required for latest user stories

Endpoint Uri Cheatsheet
---
Create user: [/api/users]()
View all users: [/api/users]()
Add exercise: [/api/users/:_id/exercises]()
Retrieve user's logs: [/api/users/:_id/logs]()

Expected Outputs
---
Create new user response:
- `Username already taken`
OR
- `{"username":"fcc_test_1596648410971","_id":"5f29cd9e782d5f13d127b456"}`

Add new exercise response: `{"_id":"5f29cd9e782d5f13d127b456","username":"fcc_test_1596648410971","date":"Sun Apr 11 2021","duration":20,"description":"situps"}`

`const expected = {
  username: 'fcc_test_1596648410971', // Obviously the numbers change
  description: 'test',
  duration: 60,
  _id: 5f29cd9e782d5f13d127b456, // Example id
  date: 'Mon Jan 01 1990'
}`

[/api/users]() displays an array:
`[{"_id":"5ed1c69d769c6521d5e19d67","username":"fcc_test_15908061741","__v":0},{"_id":"5ed1c739769c6521d5e19d77","username":"fcc_test_15908063298","__v":0}]`

[/api/users/5f29cd9e782d5f13d127b456/logs]() displays an object with a nested array:
`{"_id":"5f29cd9e782d5f13d127b456","username":"fcc_test_1596648410971","count":2,"log":[{"description":"situps","duration":20,"date":"Sun Apr 11 2021"},{"description":"situps","duration":20,"date":"Sun Apr 11 2021"}]}`

## User Stories
You can **POST** to [/api/users]() with form data username to create a new user. The returned response will be an object with username and _id properties.

You can make a **GET** request to [/api/users]() to get an array of all users. Each element in the array is an object containing a user's username and _id.

You can **POST** to [/api/users/:_id/exercises]() with form data description, duration, and optionally date. If no date is supplied, the current date will be used. The response returned will be the user object with the exercise fields added.

You can make a **GET** request to [/api/users/:_id/logs]() to retrieve a full exercise log of any user. The returned response will be the user object with a log array of all the exercises added. Each log item has the description, duration, and date properties.

A request to a user's log ([/api/users/:_id/logs]()) returns an object with a count property representing the number of exercises returned.

You can add *from*, *to* and *limit* parameters to a [/api/users/:_id/logs]() request to retrieve part of the log of any user. from and to are dates in *yyyy-mm-dd* format. *limit* is an integer of how many logs to send back.