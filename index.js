


// Importing necessary modules
import express from "express";
import bodyParser from "body-parser";

// Initializing Express app
const app = express();

// Setting the port for the server
const port = 3000;

// Master key (not used in this example, but could be used for authentication)
const masterKey = "4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

// Middleware to parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Data to store jokes (initialized as empty)
let jokes;

//1. GET a random joke
app.get('/random-joke', (req, res) => {
  // Generate a random index to select a joke from the jokes array
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json(randomJoke);
});

//2. GET a specific joke by ID
app.get('/jokes/:id', (req, res) => {
  // Extract the joke ID from the request parameters. how we access url or path parameters (in end url/ in express).
  const jokeId = parseInt(req.params.id);

  // Find the joke with the corresponding ID. in the format of an integer... (=== is checking mechanism)
  //But for that to work, we're going to have to convert this string into a number or in this case into an integer.
  // And we do that using the native built in method pass int that will convert the string into an integer
  // & store it inside ID, so we can check ID against joke ID, they are now the same type & hopefully
  // the same number if we want to get hold of it.
  const joke = jokes.find(joke => joke.id === jokeId);
  //using the JavaScript find method.
  //This takes an array & then you use the dot find method.
  // And then in the brackets of this method it expects a callback which should return true on a particular condition.
  // This callback takes an object joke essentially behind the scenes.
  // It's going to loop through this array, go through each of the items & you can call each of the items whatever you want, joke or a or whatever variable name you want to give it
 // then it's going to check against a particular return condition is the ID of that item.


  if (joke) {
    res.json(joke);
  } else {
    res.status(404).send('Joke not found');
  }
});

//we send it back as the response in a Json format.

//3. GET jokes by filtering on the joke type
app.get('/jokes', (req, res) => {
  // Extract the 'type' query parameter from the request
  const jokeType = req.query.type;


  //if (jokeType) { ... }: This is an if statement that checks if the variable jokeType is truthy. In JavaScript, a truthy value is any value that is considered true when encountered in a boolean context. In this context, jokeType will be truthy if a query parameter named type was included in the GET request.
  //const filteredJokes = jokes.filter(joke => joke.jokeType === jokeType);: If jokeType is truthy, it means that the client wants to filter the jokes by a specific type. This line of code uses the filter method on the jokes array. It creates a new array (filteredJokes) that only contains the jokes where joke.jokeType matches the provided jokeType. This is effectively filtering the jokes by type.
  //res.json(filteredJokes);: Once the jokes have been filtered, the server responds with the filtered jokes in JSON format using the res.json() method. This sends the filtered jokes back to the client.
//else { ... }: If jokeType is falsy (meaning it wasn't provided in the request), this block of code will be executed.
  //res.json(jokes);: In this case, since no specific type was requested, the server responds by sending all the jokes in JSON format back to the client.
  if (jokeType) {
    // Filter jokes based on the provided joke type
    //The solution in this case is going to hit up the forward slash filter endpoint & the type that the
    // client is requesting lives in the query parameter.
    const filteredJokes = jokes.filter(joke => joke.jokeType === jokeType);
    res.json(filteredJokes);
  } else {
    // If no type is specified, return all jokes
    res.json(jokes);
  }
});

//4. POST a new joke
// This line sets up a POST route at the endpoint /jokes. When a POST request is made to this endpoint, the provided callback function will be executed.
// The callback function takes two arguments, req (request) & res (response), representing the incoming request & the response to be sent back, respectively.
app.post('/jokes', (req, res) => {
  // Extract the new joke from the request body
  //id: It's generated by adding 1 to the current length of the jokes array. This will give a unique ID to the new joke.
  //jokeText: It's extracted from the request body using req.body.text. This assumes that the request body contains a property called text which holds the text of the joke.
   //okeType: Similarly, it's extracted from the request body using req.body.type. This assumes that the request body contains a property called type which specifies the type of the joke.
  const newJokes=
    {
      id: jokes.length +1,
      jokeText: req.body.text,
      jokeType: req.body.type,
    };

  // Add the new joke to the jokes array
  //The newly created joke is then added to the jokes array using the push method.
  jokes.push(newJoke);

  //This line logs the last item in the jokes array to the console. jokes.slice(-1) creates a new array with the last item from jokes.
  console.log(jokes.slice(-1));

  // Respond with the newly added joke
  //Finally, the newly added joke (stored in the newJoke variable) is sent back as the response in JSON format using res.json(newJoke).
  res.json(newJoke);
});

//5. PUT a joke (Update)
//This line sets up a PUT route at the endpoint /jokes/:id. The :id is a route parameter, which allows us to access the ID specified in the URL. When a PUT request is made to this endpoint, the provided callback function will be executed.
app.put('/jokes/:id', (req, res) => {
  // Extract the joke ID from the request parameters
  //This line extracts the id parameter from the request URL. req.params is an object that contains the values of route parameters. In this case, it's expecting an id. parseInt is used to convert it to an integer, as it's received as a string.
  const jokeId = parseInt(req.params.id);

  // Extract the updated joke from the request body
  //This line extracts the updated joke object from the request body. The req.body contains the data sent in the request, & it's assumed that the request body contains a valid joke object.
  const updatedJoke = req.body;

  // Update the jokes array with the new joke
  //This line updates the jokes array. It uses the map method to create a new array where each joke is either replaced with the updated joke (if its ID matches the requested ID) or remains unchanged.
  //joke.id === jokeId ? updatedJoke : joke: This is a ternary conditional operator (?:). It checks if the id of the current joke (joke.id) is equal to the requested id (jokeId). If they match, it replaces the joke with the updatedJoke. Otherwise, it keeps the original joke.
  jokes = jokes.map(joke => (joke.id === jokeId ? updatedJoke : joke));

  // Respond with the updated joke
  //Finally, the updated joke (stored in the updatedJoke variable) is sent back as the response in JSON format using res.json(updatedJoke).
  res.json(updatedJoke);
});

//6. PATCH a joke (Partial Update)
//The patch request is like our little patchwork quilt.It is a little update to a complete resource

//This line sets up a PATCH route at the endpoint /jokes/:id. Just like in the previous examples, :id is a route parameter, which allows us to access the ID specified in the URL.
//This line extracts the id parameter from the request URL, similar to what we did in the PUT request. It's converted to an integer using parseInt.
app.patch('/jokes/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);
  //This line extracts the updated fields from the request body. In a PATCH request, the body typically contains only the fields that need to be updated, not the entire resource.
  const updatedFields = req.body;
  //This line initializes a variable called updatedJoke. This variable will be used to store the joke after it has been updated.
  let updatedJoke;

  // Update the jokes array with the specified fields
  //This line starts a map operation on the jokes array. The map method creates a new array by applying a function to each element of the original array.

  //Here, we're checking if the id of the current joke (joke.id) matches the requested id (jokeId). If they match, it means this is the joke we want to update.
  //If it's the joke to be updated, we create a new object (updatedJoke) by merging the existing joke object with the updatedFields. This is a way to apply the partial update.
  //We return the updatedJoke. This means that this joke will replace the original joke in the new array being created by map.
  jokes = jokes.map(joke => {
    if (joke.id === jokeId) {
      updatedJoke = { ...joke, ...updatedFields };
      return updatedJoke;
    }
    return joke;
  });
  //If it's not the joke to be updated, we simply return the original joke

  // Respond with the updated joke
  //This marks the end of the map operation. The result is a new array where the joke with the specified ID has been updated.
  res.json(updatedJoke);
});


//If you scroll through the index.js, you'll see that I've already included the body parser code that
// is required for us to be able to tap into request dot body, I've added URL encoded as an option to
// true. we're basically ready to go using that middleware in order to receive these two pieces of data

//7. DELETE Specific joke
//app.delete('/jokes/:id', (req, res) => { ... }):
//
// This sets up a route to handle a DELETE request. The :id in the route is a URL parameter, which allows you to access it using req.params.id.
app.delete('/jokes/:id', (req, res) => {

//This line extracts the id parameter from the URL, which represents the ID of the joke to be deleted. It then converts it to an integer using parseInt since route parameters are typically treated as strings.
  const jokeId = parseInt(req.params.id);

  // Filter out the joke with the specified ID
  //This line uses the filter method to create a new array (jokes will be updated) that contains all jokes except the one with the specified ID.
  // It checks each joke's id against the provided jokeId to determine if it should be included in the new array.
  jokes = jokes.filter(joke => joke.id !== jokeId);

  // Respond with success message
  //After filtering out the joke, the server responds with a success message, indicating that the joke was deleted.
  res.send('Joke deleted successfully');
});

//Tip: Uses the filter method to create a new array excluding the joke with the specified ID.
// Pros:
// It preserves the original array & creates a new one without modifying the original data.
// It adheres to functional programming principles by not mutating the original data.
// Cons:
// It creates a new array, which can be less efficient in terms of memory usage for large arrays.

//8. DELETE All jokes
//app.delete('/jokes', (req, res) => { ... }):
//
// This sets up a route to handle a DELETE request to the '/jokes' endpoint. Since there are no parameters specified in the URL, this route is used to delete all jokes.
app.delete('/jokes', (req, res) => {
  // Remove all jokes from the array
  //This line sets the jokes array to an empty array, effectively removing all jokes. This means that after this operation, there will be no jokes left in the array.
  jokes = [];

  // Respond with success message
  //After removing all jokes, the server responds with a success message, indicating that all jokes were deleted.
  res.send('All jokes deleted successfully');
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});
//This line starts the server and makes it listen on the specified port (3000 in this case).
// When the server starts successfully, it executes the callback function, which logs a message to the console indicating that the server has started.

//Tip:
//This code doesn't include any form of authorization. Anyone can send a DELETE request to the '/jokes' endpoint, and all jokes will be deleted.
//It sends a plain text response with the message "All jokes deleted successfully".

// Initialize the jokes array with data
  jokes = [
    // ... (insert your jokes here)


    {
      id: 4,
      jokeText:
        "What did one ocean say to the other ocean? Nothing, they just waved.",
      jokeType: "Wordplay",
    },
    {
      id: 5,
      jokeText:
        "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
      jokeType: "Wordplay",
    },
    {
      id: 6,
      jokeText: "How do you organize a space party? You planet!",
      jokeType: "Science",
    },
    {
      id: 7,
      jokeText:
        "Why don't some couples go to the gym? Because some relationships don't work out.",
      jokeType: "Puns",
    },
    {
      id: 8,
      jokeText:
        "Parallel lines have so much in common. It's a shame they'll never meet.",
      jokeType: "Math",
    },
    {
      id: 9,
      jokeText: "What do you call fake spaghetti? An impasta!",
      jokeType: "Food",
    },
    {
      id: 10,
      jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
      jokeType: "Food",
    },
    {
      id: 11,
      jokeText:
        "What do you get when you cross a snowman and a vampire? Frostbite!",
      jokeType: "Wordplay",
    },
    {
      id: 12,
      jokeText:
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
      jokeType: "Sports",
    },
    {
      id: 13,
      jokeText:
        "Why are ghosts bad at lying? Because you can see right through them!",
      jokeType: "Wordplay",
    },
    {
      id: 14,
      jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
      jokeType: "Movies",
    },
    {
      id: 15,
      jokeText:
        "I'm reading a book about anti-gravity. It's impossible to put down!",
      jokeType: "Science",
    },
    {
      id: 16,
      jokeText:
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      jokeType: "Puns",
    },
    {
      id: 17,
      jokeText:
        "What did one ocean say to the other ocean? Nothing, they just waved.",
      jokeType: "Wordplay",
    },
    {
      id: 18,
      jokeText:
        "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
      jokeType: "Wordplay",
    },
    {
      id: 19,
      jokeText: "How do you organize a space party? You planet!",
      jokeType: "Science",
    },
    {
      id: 20,
      jokeText:
        "Why don't some couples go to the gym? Because some relationships don't work out.",
      jokeType: "Puns",
    },
    {
      id: 21,
      jokeText:
        "Parallel lines have so much in common. It's a shame they'll never meet.",
      jokeType: "Math",
    },
    {
      id: 22,
      jokeText: "What do you call fake spaghetti? An impasta!",
      jokeType: "Food",
    },
    {
      id: 23,
      jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
      jokeType: "Food",
    },
    {
      id: 24,
      jokeText:
        "What do you get when you cross a snowman and a vampire? Frostbite!",
      jokeType: "Wordplay",
    },
    {
      id: 25,
      jokeText:
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
      jokeType: "Sports",
    },
    {
      id: 26,
      jokeText:
        "Why are ghosts bad at lying? Because you can see right through them!",
      jokeType: "Wordplay",
    },
    {
      id: 27,
      jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
      jokeType: "Movies",
    },
    {
      id: 28,
      jokeText:
        "I'm reading a book about anti-gravity. It's impossible to put down!",
      jokeType: "Science",
    },
    {
      id: 29,
      jokeText:
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      jokeType: "Puns",
    },
    {
      id: 30,
      jokeText:
        "What did one ocean say to the other ocean? Nothing, they just waved.",
      jokeType: "Wordplay",
    },
    {
      id: 31,
      jokeText:
        "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
      jokeType: "Wordplay",
    },
    {
      id: 32,
      jokeText: "How do you organize a space party? You planet!",
      jokeType: "Science",
    },
    {
      id: 33,
      jokeText:
        "Why don't some couples go to the gym? Because some relationships don't work out.",
      jokeType: "Puns",
    },
    {
      id: 34,
      jokeText:
        "Parallel lines have so much in common. It's a shame they'll never meet.",
      jokeType: "Math",
    },
    {
      id: 35,
      jokeText: "What do you call fake spaghetti? An impasta!",
      jokeType: "Food",
    },
    {
      id: 36,
      jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
      jokeType: "Food",
    },
    {
      id: 37,
      jokeText:
        "What do you get when you cross a snowman and a vampire? Frostbite!",
      jokeType: "Wordplay",
    },
    {
      id: 38,
      jokeText:
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
      jokeType: "Sports",
    },
    {
      id: 39,
      jokeText:
        "Why are ghosts bad at lying? Because you can see right through them!",
      jokeType: "Wordplay",
    },
    {
      id: 40,
      jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
      jokeType: "Movies",
    },
    {
      id: 41,
      jokeText:
        "I'm reading a book about anti-gravity. It's impossible to put down!",
      jokeType: "Science",
    },
    {
      id: 42,
      jokeText:
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      jokeType: "Puns",
    },
    {
      id: 43,
      jokeText:
        "What did one ocean say to the other ocean? Nothing, they just waved.",
      jokeType: "Wordplay",
    },
    {
      id: 44,
      jokeText:
        "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
      jokeType: "Wordplay",
    },
    {
      id: 45,
      jokeText: "How do you organize a space party? You planet!",
      jokeType: "Science",
    },
    {
      id: 46,
      jokeText:
        "Why don't some couples go to the gym? Because some relationships don't work out.",
      jokeType: "Puns",
    },
    {
      id: 47,
      jokeText:
        "Parallel lines have so much in common. It's a shame they'll never meet.",
      jokeType: "Math",
    },
    {
      id: 48,
      jokeText: "What do you call fake spaghetti? An impasta!",
      jokeType: "Food",
    },
    {
      id: 49,
      jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
      jokeType: "Food",
    },
    {
      id: 50,
      jokeText:
        "What do you get when you cross a snowman and a vampire? Frostbite!",
      jokeType: "Wordplay",
    },
    {
      id: 51,
      jokeText:
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
      jokeType: "Sports",
    },
    {
      id: 52,
      jokeText:
        "Why are ghosts bad at lying? Because you can see right through them!",
      jokeType: "Wordplay",
    },
    {
      id: 53,
      jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
      jokeType: "Movies",
    },
    {
      id: 54,
      jokeText:
        "I'm reading a book about anti-gravity. It's impossible to put down!",
      jokeType: "Science",
    },
    {
      id: 55,
      jokeText:
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      jokeType: "Puns",
    },
    {
      id: 56,
      jokeText:
        "What did one ocean say to the other ocean? Nothing, they just waved.",
      jokeType: "Wordplay",
    },
    {
      id: 57,
      jokeText:
        "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
      jokeType: "Wordplay",
    },
    {
      id: 58,
      jokeText: "How do you organize a space party? You planet!",
      jokeType: "Science",
    },
    {
      id: 59,
      jokeText:
        "Why don't some couples go to the gym? Because some relationships don't work out.",
      jokeType: "Puns",
    },
    {
      id: 60,
      jokeText:
        "Parallel lines have so much in common. It's a shame they'll never meet.",
      jokeType: "Math",
    },
    {
      id: 61,
      jokeText: "What do you call fake spaghetti? An impasta!",
      jokeType: "Food",
    },
    {
      id: 62,
      jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
      jokeType: "Food",
    },
    {
      id: 63,
      jokeText:
        "What do you get when you cross a snowman and a vampire? Frostbite!",
      jokeType: "Wordplay",
    },
    {
      id: 64,
      jokeText:
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
      jokeType: "Sports",
    },
    {
      id: 65,
      jokeText:
        "Why are ghosts bad at lying? Because you can see right through them!",
      jokeType: "Wordplay",
    },
    {
      id: 66,
      jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
      jokeType: "Movies",
    },
    {
      id: 67,
      jokeText:
        "I'm reading a book about anti-gravity. It's impossible to put down!",
      jokeType: "Science",
    },
    {
      id: 68,
      jokeText:
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      jokeType: "Puns",
    },
    {
      id: 69,
      jokeText:
        "What did one ocean say to the other ocean? Nothing, they just waved.",
      jokeType: "Wordplay",
    },
    {
      id: 70,
      jokeText:
        "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
      jokeType: "Wordplay",
    },
    {
      id: 71,
      jokeText: "How do you organize a space party? You planet!",
      jokeType: "Science",
    },
    {
      id: 72,
      jokeText:
        "Why don't some couples go to the gym? Because some relationships don't work out.",
      jokeType: "Puns",
    },
    {
      id: 73,
      jokeText:
        "Parallel lines have so much in common. It's a shame they'll never meet.",
      jokeType: "Math",
    },
    {
      id: 74,
      jokeText: "What do you call fake spaghetti? An impasta!",
      jokeType: "Food",
    },
    {
      id: 75,
      jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
      jokeType: "Food",
    },
    {
      id: 76,
      jokeText:
        "What do you get when you cross a snowman and a vampire? Frostbite!",
      jokeType: "Wordplay",
    },
    {
      id: 77,
      jokeText:
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
      jokeType: "Sports",
    },
    {
      id: 78,
      jokeText:
        "Why are ghosts bad at lying? Because you can see right through them!",
      jokeType: "Wordplay",
    },
    {
      id: 79,
      jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
      jokeType: "Movies",
    },
    {
      id: 80,
      jokeText:
        "I'm reading a book about anti-gravity. It's impossible to put down!",
      jokeType: "Science",
    },
    {
      id: 81,
      jokeText:
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      jokeType: "Puns",
    },
    {
      id: 82,
      jokeText:
        "What did one ocean say to the other ocean? Nothing, they just waved.",
      jokeType: "Wordplay",
    },
    {
      id: 83,
      jokeText:
        "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
      jokeType: "Wordplay",
    },
    {
      id: 84,
      jokeText: "How do you organize a space party? You planet!",
      jokeType: "Science",
    },
    {
      id: 85,
      jokeText:
        "Why don't some couples go to the gym? Because some relationships don't work out.",
      jokeType: "Puns",
    },
    {
      id: 86,
      jokeText:
        "Parallel lines have so much in common. It's a shame they'll never meet.",
      jokeType: "Math",
    },
    {
      id: 87,
      jokeText: "What do you call fake spaghetti? An impasta!",
      jokeType: "Food",
    },
    {
      id: 88,
      jokeText: "Why did the tomato turn red? Because it saw the salad dressing!",
      jokeType: "Food",
    },
    {
      id: 89,
      jokeText:
        "What do you get when you cross a snowman and a vampire? Frostbite!",
      jokeType: "Wordplay",
    },
    {
      id: 90,
      jokeText:
        "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
      jokeType: "Sports",
    },
    {
      id: 91,
      jokeText:
        "Why are ghosts bad at lying? Because you can see right through them!",
      jokeType: "Wordplay",
    },
    {
      id: 92,
      jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
      jokeType: "Movies",
    },
    {
      id: 93,
      jokeText:
        "I'm reading a book about anti-gravity. It's impossible to put down!",
      jokeType: "Science",
    },
    {
      id: 94,
      jokeText:
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      jokeType: "Puns",
    },
    {
      id: 95,
      jokeText:
        "What did one ocean say to the other ocean? Nothing, they just waved.",
      jokeType: "Wordplay",
    },
    {
      id: 96,
      jokeText:
        "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
      jokeType: "Wordplay",
    },
    {
      id: 97,
      jokeText: "How do you organize a space party? You planet!",
      jokeType: "Science",
    },
    {
      id: 98,
      jokeText:
        "Why don't some couples go to the gym? Because some relationships don't work out.",
      jokeType: "Puns",
    },
    {
      id: 99,
      jokeText:
        "Parallel lines have so much in common. It's a shame they'll never meet.",
      jokeType: "Math",
    },
    {
      id: 100,
      jokeText: "What do you call fake spaghetti? An impasta!",
      jokeType: "Food",
    }]

//tip: In JavaScript, map is a higher-order function that is used to transform elements in an array. It creates a new array by applying a specified function to each element in the original array, & then returns the resulting array.

// Here's a breakdown of how map works:

// Syntax:

// javascript
// Copy code
// const newArray = array.map(callback(element, index, array));
// array: The original array.
// callback: A function that will be applied to each element in the array.
// element: The current element being processed.
// index: The index of the current element.
// array: The original array.

// What It Does:

// map iterates through each element of the array.
// For each element, it calls the provided callback function.
// The callback function processes the current element & returns a value.
// This value is then added to the new array.

// Return Value:

// map returns a new array containing the transformed elements.

// It's important to note that map doesn't modify the original array. It creates a new array with the transformed elements.

// Common Use Cases:

// Transforming data: For example, converting an array of objects into an array of specific properties.
// Applying a function to each element in an array.


//This Version of patch:

// Pros:

// Uses spread operator to concisely merge fields. This can be very convenient for merging multiple fields at once.
// May be considered more concise & elegant by some developers.

// Cons:

// May overwrite fields unintentionally if the fields have the same name.