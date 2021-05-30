# [Personal Library](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/personal-library)


## NOTES
Additional module: mongoose

Tasks:
- Complete the necessary routes (POST, GET, DELETE) in [/routes/api.js](#routes/api.js)
- Create all (10) of the functional tests in [tests/2_functional-tests.js](#tests/2_functional-tests.js)
- Set `NODE_ENV=test` in [Secrets]()
- Set mongo URI as `DB` in [Secrets]()

Required fields:
- _id
- title

Optional fields:
- commentcount
- comments

Sample valid POST [/api/books]() response:
`{"_id":"608c6b17ba96a30656806c09","title":"New Book"}`

Sample invalid POST [/api/books]():
`missing required field title`

Sample GET [/api/books]() response:
`[{"comments":[],"_id":"608b7149ba96a30656806c05","title":"allah","commentcount":0,"__v":0},{"comments":[],"_id":"608c14c7ba96a30656806c06","title":"kimetsu no yaiba","commentcount":0,"__v":0},{"comments":[],"_id":"608c14cfba96a30656806c07","title":"Rate your experience","commentcount":0,"__v":0},{"comments":[],"_id":"608c1dbbba96a30656806c08","title":"java","commentcount":0,"__v":0},{"comments":["Test Comment","Another (front-end) comment"],"_id":"608c6b17ba96a30656806c09","title":"New Book","commentcount":2,"__v":2},{"comments":[],"_id":"608c6c87ba96a30656806c0b","title":"Another Book","commentcount":0,"__v":0},{"comments":[],"_id":"608c6cc2ba96a30656806c0d","title":"A FE Book","commentcount":0,"__v":0},{"comments":[],"_id":"608c6d9bba96a30656806c0e","title":"Last Book","commentcount":0,"__v":0}]`

Sample GET [/api/books/{:_id}]() response, no comments:
`{"comments":[],"_id":"608c6cc2ba96a30656806c0d","title":"A FE Book","commentcount":0,"__v":0}`

Sample GET [/api/books/{:_id}]() response (w/ comments):
`{"comments":["Test Comment","Another (front-end) comment"],"_id":"608c6b17ba96a30656806c09","title":"New Book","commentcount":2,"__v":2}`

Sample missing book response:
`no book exists`

Sample delete book response:
`delete successful`

Sample delete all response:
`complete delete successful`

## TESTING
Write the following tests in [tests/2_functional-tests.js](#tests/2_functional-tests.js):

- POST to [/api/books]() with title as part of the form data to add a book.
  1. The returned response will be an object with the `title` and a unique `_id` as keys.
  2. If title is not included in the request, the returned response should be the string: `missing required field title`.

- GET request to [/api/books]()
  3. Receive a JSON response representing all the books. The JSON response will be an array of objects with each object (book) containing `title`,` _id`, and `commentcount` properties.

- GET request to [/api/books/{_id}]()
  4. Retrieve a single object of a book containing the properties `title`, `_id`, and a `comments` array (empty array if no comments present).
  5. If no book is found, return the string: `'no book exists'`

- POST request to [/api/books/{_id}]() containing comment as the form body data to add a comment to a book
  6. The returned response will be the books object similar to GET /api/books/{_id} request in an earlier test
  7. If comment is not included in the request, return the string missing required field comment
  8. If no book is found, return the string no book exists.

- DELETE request to [/api/books/{_id}]() to delete a book from the collection
  9. The returned response will be the string delete successful if successful. If no book is found, return the string no book exists.

- DELETE request to [/api/books]() to delete all books in the database. The returned response will be the string 'complete delete successful if successful.


## USER STORIES
You can send a POST request to /api/books with title as part of the form data to add a book. The returned response will be an object with the title and a unique _id as keys. If title is not included in the request, the returned response should be the string missing required field title.

You can send a GET request to /api/books and receive a JSON response representing all the books. The JSON response will be an array of objects with each object (book) containing title, _id, and commentcount properties.

You can send a GET request to /api/books/{_id} to retrieve a single object of a book containing the properties title, _id, and a comments array (empty array if no comments present). If no book is found, return the string no book exists.

You can send a POST request containing comment as the form body data to /api/books/{_id} to add a comment to a book. The returned response will be the books object similar to GET /api/books/{_id} request in an earlier test. If comment is not included in the request, return the string missing required field comment. If no book is found, return the string no book exists.

You can send a DELETE request to /api/books/{_id} to delete a book from the collection. The returned response will be the string delete successful if successful. If no book is found, return the string no book exists.

You can send a DELETE request to /api/books to delete all books in the database. The returned response will be the string 'complete delete successful if successful.

All 10 functional tests required are complete and passing.