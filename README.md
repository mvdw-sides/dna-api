# DNA API

# contents

- 1.  Introduction
- 2.  Setup
- 3.  Tests
- 4.  Assumptions
- 5.  Scaling

## 1. Introduction

Simple RESTfull api that stores and filters DNA strings and scores them when searching for them.

The application is build on `serverless` a JS framework for building application on top of FAAS services (This app uses the AWS Lambda stack)

### Endpoints:

🔍 Simple search example (Returns an array with all matches and their distance)

> `GET /strings/{search-query}`

🔍 Search with max distance between search and matches (Returns a filtered array with matches within the given distance)

> `GET: /strings/{search-query}?distance={distance}`

🥪 Insert a new string into the storage (inserts the record into the storage)

> `POST /strings`

_Body:_

> `{"string": "ACTGACTGACTGACTG"}`

##### Query information

| field        | type       |
| ------------ | ---------- |
| search-query | string     |
| distance     | number/int |

##### Response format

The find request always returns an array with objects.

```
[
  {
    "string": "string"
    "score": "number"
  }
]
```

For example:

```
[
  {
    "string": "ACTGACTGACTGACTGACTGACTG",
    "score": 16
  },
  {
    "string": "ACTGACTGACTG",
    "score": 8
  },
  {
    "string": "GTACCCAAGGTTGGAAACCC",
    "score": 14
  },
  {
    "string": "GGAACCGGTTCCAAAGGGT",
    "score": 34
  }
]
```

## 2. Setup

To get started, clone the repository; once that's done install and run with `yarn`.

> `yarn && yarn dev`

The server will start on the Serverless default port (`3000`)

## 3. Tests

The api is fully tested with `jest`, the test suite can be ran by running `yarn test`. This includes unit and end to end testing.

## 4. Assumptions

To get this project done on time, some assumptions and slicing in features had to be made.

**Input strings won't run into the Gigs of data**: After some research, Google told me that DNA strings, can be massive. To cut down on development time and keep everything simple; i took the assumption that we'll be using small strings for testing this.

**Data persistence and speed are not the goal** The api uses memory storage and a file as persistence back-end; to avoid adding the extra complexity and development overhead into this application.

**Data protection and restricted access are not required** The API does not have any authentication in place, it has a fully open CORS setup and no endpoint has any sort of rate limiting or limiting in general.

## 5. Scaling

There is quite a lot that needs to happen in order to scale this application to actual and users.

There are items which just are not in place:
An actual database, Caching, Authentication

And there are items which can be heavily improved on:
The scoring function is written in JS and it's slow for large datasets.
