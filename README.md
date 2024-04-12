# Joke API

This is a simple Express.js application that provides an API for managing jokes. It allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of jokes.

## Installation

1. Clone the repository:

```bash
git clone <repository_url>
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

## Endpoints

### 1. GET /random-joke

- Description: Retrieve a random joke from the collection.
- Example Response:
  ```json
  {
    "id": 4,
    "jokeText": "What did one ocean say to the other ocean? Nothing, they just waved.",
    "jokeType": "Wordplay"
  }
  ```

### 2. GET /jokes/:id

- Description: Retrieve a specific joke by its ID.
- Example Response:
  ```json
  {
    "id": 5,
    "jokeText": "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
    "jokeType": "Wordplay"
  }
  ```

### 3. GET /jokes?type=:type

- Description: Retrieve jokes filtered by type.
- Example Response:
  ```json
  [
    {
      "id": 6,
      "jokeText": "How do you organize a space party? You planet!",
      "jokeType": "Science"
    },
    {
      "id": 7,
      "jokeText": "Why don't some couples go to the gym? Because some relationships don't work out.",
      "jokeType": "Puns"
    }
  ]
  ```

### 4. POST /jokes

- Description: Add a new joke to the collection.
- Request Body:
  ```json
  {
    "text": "Why don't scientists trust atoms? Because they make up everything!",
    "type": "Science"
  }
  ```
- Example Response:
  ```json
  {
    "id": 101,
    "jokeText": "Why don't scientists trust atoms? Because they make up everything!",
    "jokeType": "Science"
  }
  ```

### 5. PUT /jokes/:id

- Description: Update a joke by its ID.
- Request Body:
  ```json
  {
    "jokeText": "Updated joke text",
    "jokeType": "Updated type"
  }
  ```
- Example Response:
  ```json
  {
    "id": 10,
    "jokeText": "Updated joke text",
    "jokeType": "Updated type"
  }
  ```

### 6. PATCH /jokes/:id

- Description: Partially update a joke by its ID.
- Request Body:
  ```json
  {
    "jokeText": "Partially updated joke text"
  }
  ```
- Example Response:
  ```json
  {
    "id": 10,
    "jokeText": "Partially updated joke text",
    "jokeType": "Updated type"
  }
  ```

### 7. DELETE /jokes/:id

- Description: Delete a joke by its ID.
- Example Response:
  ```
  Joke deleted successfully
  ```

### 8. DELETE /jokes

- Description: Delete all jokes from the collection.
- Example Response:
  ```
  All jokes deleted successfully
  ```

## Notes

- This API does not include any form of authentication or authorization. Ensure proper security measures are implemented before deploying it in a production environment.
- The `jokes` collection is initialized with sample data. You can modify it as needed or integrate it with a database for persistent storage.

---

