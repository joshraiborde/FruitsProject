const mongoose = require("mongoose");

// Current Date and Time
const now = new Date();

// Call async main function declared below and catch any errors.
main().catch((err) => console.log(err));

// Go read this for a better understanding of async and await:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function main() {
  // Connect to mongoDB locally.
  await mongoose.connect("mongodb://localhost:27017/fruitsDB");

  // Creating the fruitSchema.
  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Fruits must have a name."]
    },
    rating: {
      // Pay attention here because Angela uses score somewhere in the video... it took me 35 minutes to figure out why my code wasn't working xD.
      type: Number,
      min: [1, "min >= 1"],
      max: [10, "max <= 10"]
    },
    review: String
  });

  // Compiling Schema into a Model. FRUIT MODEL.
  // the schema is used to create a Mongoose model
  // creating a colletion called fruits
  // the 1st parameter, a singular string, is the name of the collection that is going to comply with the fruitSchema
  // the 2nd parameter is the name of the schema
  const Fruit = mongoose.model("Fruit", fruitSchema);

  // Creating person Schema.
  const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema //REMEMBER TO ADD THIS OR IT WON'T WORK.
  });

  // Compiling person Schema into a model. PERSON MODEL.
  const Person = mongoose.model("Person", personSchema);

  // First part of the lesson 340.

  // const pineapple = new Fruit({
  //   name: "Pineapple",
  //   rating: 9,
  //   review: "Great fruit.",
  // });

  // await pineapple.save();

  // const person = new Person({
  //   name: "Amy",
  //   age: 12,
  //   favouriteFruit: pineapple, //Add a reference to pineapple doc.
  // });

  // await person.save();

  // Second part of lesson 340.

  const blueberry = new Fruit({
    name: "Blueberry",
    rating: 8,
    review: "sweet"
  });

  await blueberry.save();

  const person = new Person({
    name: "John",
    age: 37,
    favouriteFruit: blueberry //Add a reference to pineapple doc.
  });

  await person.save();

  // Add favouriteFruit document reference to John.
  // Person.updateOne({name: "John"}, {favouriteFruit: uva}, (err, johnDoc) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Updated John document: ", johnDoc);
  //   }
  // });

  // End of second part

  // Find all the fruits inside fruits collection with mongoose .find({}, callback).
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
}
// end of async main func.
