const mongoose = require("mongoose");

// fruitsDB is the name of the database we want to create/connect to
mongoose.connect("mongodb://localhost:27017/fruitsDB");

// Current Date and Time
const now = new Date();

// schema for fruits
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// the schema is used to create a Mongoose model
// creating a colletion called fruits
// the 1st parameter, a singular string, is the name of the collection that is going to comply with the fruitSchema
// the 2nd parameter is the name of the schema
const Fruit = mongoose.model("Fruit", fruitSchema);

// creating a document from the model Fruit
const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "I like pineapples"
});

// added an entry to the fruitDB
Fruit.insertMany([pineapple], (error) => {
  if (error) {
    console.log(error + " " + now.toUTCString());
  } else {
    console.log(
      "Successfully saved fruits to fruitsDB on " + now.toUTCString()
    );
  }
});

// new fruit
const lemon = new Fruit({
  name: "Lemon",
  rating: 9,
  review: "Love 'em"
});

// new fruit
const mango = new Fruit({
  name: "Mango",
  rating: 10,
  review: "i like mangos"
});

// the following block of code is commented out for the sake of lesson 337. READING FROM YOUR DATABASE WITH MONGOOSE,
// every time the server is restarted, the mongo server would add the pineapple, lemon and mango fruits to the database again
// save in bulk
// specify the name of the mongoose model
// insertMany() takes two parameters:
// 1. an array of objects that match the schema
// 2. a callback function which is allows us to log any errors
// if theres an error, console log an error
// else, log a successful message

// Fruit.insertMany([pineapple, lemon, mango], (error) => {
//   if (error) {
//     console.log(error + " " + now.toUTCString());
//   } else {
//     console.log(
//       "Successfully saved fruits to fruitsDB on " + now.toUTCString()
//     );
//   }
// });

// reading from mongoose
// tap into the fruits collection through the Fruit model
// Find all the fruits inside fruits collection with mongoose .find({}, callback).
// the find function has two parameters:
// 1. err
// 2. whatever it finds back
Fruit.find((err, fruits) => {
  if (err) {
    console.log(error + " " + now.toUTCString());
  } else {
    // Close connection to database if successfull!
    mongoose.connection.close();
    
    // Console log all the fruit names inside fruits collection.
    fruits.forEach((fruit) => {
      console.log(fruit.name + " " + now.toUTCString());
    });
  }
});

// update
// the 1st param is the item you want to update, which is denoted by the id
// 2nd param is what do you want to do update about the 1st param, in this case, it is to update the name field of the id
// 3rd param is to log any errors or a "successful" message.
// Fruit.updateOne(
//   { _id: "623b392862be372cf86c5e2a" },
//   { name: "Peach" },
//   (err) => {
//     if (err) {
//       console.log(error + " " + now.toUTCString());
//     } else {
//       console.log("Successfully updated the document on " + now.toUTCString());
//     }
//   }
// );

// delete
// the 1st param is the item you want to delete, which is denoted by the id
// 2nd param is to log any errors or a "successful" message.

// Fruit.deleteOne({name: "Peach"}, (err) => {
//   if (err) {
//     console.log(error + " " + now.toUTCString());
//   } else {
//     console.log("Successfully deleted " + fruit.name + " the document on " + now.toUTCString());
//   }
// })

// ************************************************************** //

// schema for person
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

// the schema is used to create a Mongoose model
// creating a colletion called person
// the 1st parameter, a singular string, is the name of the collection that is going to comply with the personSchema
// the 2nd parameter is the name of the schema
const Person = mongoose.model("Person", personSchema);

const blueberry = new Fruit({
  name: "bluebery",
  score: 9,
  review: "Great Fruit!"
});


// creating a document from the model Person
const person = new Person({
  name: "Amy",
  age: 23,
  favouriteFruit: blueberry
});


// added an entry to the personDB
Person.insertMany([person], (error) => {
  if (error) {
    console.log(error + " " + now.toUTCString());
  } else {
    console.log(
      "Successfully saved " +
        person.name +
        " to fruitsDB on " +
        now.toUTCString()
    );
  }
});

// reading from mongoose
// tap into the fruits collection through the Person model
// the find function has two parameters:
// 1. err
// 2. whatever it finds back
Person.find((err, persons) => {
  if (err) {
    console.log(error + " " + now.toUTCString());
  } else {
    mongoose.connection.close();
    persons.forEach((person) => {
      console.log(person.name + " " + now.toUTCString());
    });
  }
});

// Person.updateOne(
//   { _id: "623b392862be372cf86c5e2a" },
//   { name: "George" },
//   (err) => {
//     if (err) {
//       console.log(error + " " + now.toUTCString());
//     } else {
//       console.log("Successfully updated the document on " + now.toUTCString());
//     }
//   }
// );

// delete
Person.deleteMany({ name: "John" }, (err) => {
  if (err) {
    console.log(error + " " + now.toUTCString());
  } else {
    console.log(
      "Successfully deleted all the '" +
        person.name +
        "'s in the document on " +
        now.toUTCString()
    );
  }
});
